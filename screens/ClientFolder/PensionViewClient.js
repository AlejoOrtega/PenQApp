import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Service from '../../components/Services';
import StarRating from 'react-native-star-rating';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class PensionViewClient extends React.Component {
  constructor(props){
      super(props);

      this.state={
        user:'',
        comida: this.props.target.Comida,
        render:false,
        ComentariosyRating: [],
        userComentario: '',
        ratingTotal:0,
        HaComentado: false
      }
      
  }

  componentDidMount(){
    var pension = firebase.database().ref('Pensiones/'+this.props.target.ID);
    pension.once('value', (dataSnapshot)=>{

      var PenData = Object.values(dataSnapshot.val());
      var userID = Object.values(PenData[2])
      var comentariosLista = Object.values(PenData[0])
      this.setState({ComentariosyRating:comentariosLista})
      var owner = firebase.database().ref('Users/'+userID[12]+'/Account-Info');
      owner.once('value',(dataSnapshot)=>{
        this.setState({user: dataSnapshot.val()})
      })
    })

    var cuartos = firebase.database().ref('Pensiones/'+this.props.target.ID+'/Cuartos');
    cuartos.once('value', (snap)=>{
      var cuartos=[]
      snap.forEach((childSnap)=>{
        var futu = childSnap.val();
        if(typeof futu.Precio==='string'){
          cuartos=cuartos.concat(childSnap.val());
        }       
      })
      this.props.loadCuartos(cuartos);
      
    })
    
  }
  _onPressVerCuartos=()=>{
    this.props.navigation.navigate('CuartosView')
  }
  _onPressCalificar=()=>{
    this.props.navigation.navigate('Rating')
  }

  showComentarios(){
    code=[]
    if(this.state.ComentariosyRating.length != 0){
      var totalR = 0;
      var comentado = false;
      for (i = 0; i < this.state.ComentariosyRating.length; i++) {
        var UserdelComentario = firebase.database().ref('Users/' + this.state.ComentariosyRating[i].comentadorPorUser + '/Account-Info');
        totalR = totalR + this.state.ComentariosyRating[i].RatingTotal
        if(firebase.auth().currentUser.uid ==  this.state.ComentariosyRating[i].comentadorPorUser){
          comentado = true
        }
        UserdelComentario.once('value', (dataSnapshot) => {

          var userData = Object.values(dataSnapshot.val());
          var userName = Object.values(userData[0]);
          var nombreU = ''
          var apellidoU = ''
          for(k=0;k<userName.length;k++){
            apellidoU = apellidoU + userName[k]
          }
          var userLastname = Object.values(userData[3]);
          for(j=0;j<userLastname.length;j++){
            nombreU = nombreU + userLastname[j]
          }
          var fullname = nombreU + ' '+apellidoU
          
          this.setState({ 
            userComentario: fullname,
            ratingTotal: totalR,
            HaComentado: comentado
          })
        })
        code.push(
          <View>
            <Text>{this.state.userComentario}</Text>
            <Text>{this.state.ComentariosyRating[i].comentario}</Text>
          </View>
        )
      }
    }else{
      code.push(
        <Text>No hay comentarios sobre esta pension</Text>
      )
    }
    return code;
  }
  _services(){
    code=[]
    if(this.state.comida){
      code.push(<Text>Comida</Text>)
    }
    if(this.props.target.Aseo){
      code.push(<Text>Aseo</Text>)
    }
    if(this.props.target.Internet){
      code.push(<Text>Internet</Text>)
    }
    if(this.props.target.Llaves){
      code.push(<Text>Llaves de la Casa</Text>)
    }
    if(this.props.target.Lavado){
      code.push(<Text>Lavado de Ropa</Text>)
    }
    return code;
  }
  render() {
    if (this.state.HaComentado == false) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>{this.props.target.Alias}</Text>
          </View>
          <View style={styles.center}>
            <View style={styles.penInfo}>
              <Text>Boss: {this.state.user.Nombre} {this.state.user.Apellido}</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={this.state.ratingTotal / this.state.ComentariosyRating.length}
              />
              <Text>{this.props.target.Direccion}</Text>
              <Text>{this.props.target.Barrio}</Text>
              <Text>Servicios</Text>
              <Service data={this.props.target} />
            </View>
          </View>
          <View style={styles.footer}>
            <Text>Seccion de Comentarios</Text>
            {this.showComentarios()}
            <Button
              title='Viviste aqui? Calificalo!'
              onPress={this._onPressCalificar} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>{this.props.target.Alias}</Text>
          </View>
          <View style={styles.center}>
            <View style={styles.penInfo}>
              <Text>Boss: {this.state.user.Nombre} {this.state.user.Apellido}</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={this.state.ratingTotal / this.state.ComentariosyRating.length}
              />
              <Text>{this.props.target.Direccion}</Text>
              <Text>{this.props.target.Barrio}</Text>
              <Text>Servicios</Text>
              <Service data={this.props.target} />
            </View>
          </View>
          <View style={styles.footer}>
            <Text>Seccion de Comentarios</Text>
            {this.showComentarios()}
          </View>
        </View>
      );
    }
  }
}

function mapStateToProps(state){
  const {target}=state;
  return {
    target
  };
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch),
    updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
    loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PensionViewClient);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    backgroundColor: 'lightblue',
  },
  center:{
    flex: 2,
    padding: 10,
    flexDirection:'row',
    alignItems:'stretch',
    justifyContent:'space-between'
  },
  penOpt:{
    justifyContent: 'flex-end',
  },
  footer:{
    justifyContent: 'flex-end',
    flex: 0.5,
  },
  fab:{
    backgroundColor: '#5067FF',
  },
  logOutButton:{
    backgroundColor: '#DD5144',
  },
  addButton:{
    backgroundColor: '#34A34F' 
  },
  accountButton:{
    backgroundColor: '#3B5998'
  }
});
