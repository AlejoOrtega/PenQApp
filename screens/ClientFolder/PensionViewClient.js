import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native';
import Service from '../../components/Services';
import StarRating from 'react-native-star-rating';
import ComentsLoader from '../../components/ComentsLoader';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class PensionViewClient extends React.Component {
  constructor(props){
      super(props);

      this.state={
        user:'',
        render:false,
        userComentario: '',
      }
      
  }

  componentWillMount(){
    
    var owner = firebase.database().ref('Users/'+this.props.target.bossID+'/Account-Info');
    owner.once('value',(dataSnapshot)=>{
      this.setState({user: dataSnapshot.val()})
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
    var cuartos = firebase.database().ref('Pensiones/'+this.props.target.ID+'/Cuartos');
    cuartos.once('value', (snap)=>{
      var cuartos=[]
      snap.forEach((childSnap)=>{
        var futu = childSnap.val();

        if(typeof futu === 'object'){
          cuartos=cuartos.concat(childSnap.val());
        }  
      })
      this.props.loadCuartos(cuartos);
    })
    this.props.navigation.navigate('ListaCuartos')
  }
  _onPressCalificar=()=>{
    this.props.navigation.navigate('Rating')
  }
  _onPressRating=()=>{
    this.props.navigation.navigate('ViewRating')
  }


  render() {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require('../images/PensionProfileScreen_elN700x450FrontYardIdeasBedheadGarden_345528.jpg')}
            />
          </View>
          <View style={styles.CalificacionSty}>
                <StarRating
                  disabled={true}
                  fullStarColor={'yellow'}
                  maxStars={5}
                  rating={this.props.target.Rating}
                />
                <TouchableHighlight
                  onPress={this._onPressRating}>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../Image/NotLogo.png')}
                  />
                </TouchableHighlight>

          </View>
          <View style={styles.center}>
            <View style={styles.penInfo}>
              <Text style = {{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>{this.props.target.Alias}</Text>
              <View style = {styles.InfoPen}>
                
                <Text>Administrador: {this.state.user.Nombre} {this.state.user.Apellido}</Text>

                <Text>Direccion: {this.props.target.Direccion}</Text>
                <Text>Barrio: {this.props.target.Barrio}</Text>
                <Text>Servicios: </Text>
                <Service data={this.props.target} />
                <View style={styles.EditButton}>
                  <Button
                    style = {{width: 200, height: 50}}
                    title="Ver Cuartos!"
                    color = '#7b68ee' 
                    onPress={this._onPressVerCuartos} />
              </View>
              </View>
              
              
            </View>
            
          </View>
          <View style={styles.footer}>
            <Text style = {{fontSize: 18, fontWeight: 'bold'}}>Seccion de Comentarios</Text>
            <ComentsLoader onPressCalificar={this._onPressCalificar} tipo="cliente"/>
          </View>
        </View>
      );

    }
  
}

function mapStateToProps(state){
  const {target, coments}=state;
  return {
    target,
    coments
  };
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch),
    updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
    loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
    loadComents: bindActionCreators(Actions.loadComents,dispatch)
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
    flex: 1,
  },
  InfoPen:{
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#7b68ee',
    paddingHorizontal: 5,
    fontSize: 14,
    margin: 5
  },
  CalificacionSty:{
    justifyContent: 'center',
    alignItems:'center',
    flexDirection:'row', 
    marginTop: 10
  },
  logo:{
    height: 150
  },
  center:{
    flex: 2,
    marginTop:5,
    justifyContent:'center'
  },
  penOpt:{
    justifyContent: 'center',
  },
  footer:{
    justifyContent: 'flex-end',
    alignItems:'center'
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
