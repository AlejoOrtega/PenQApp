import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Service from '../../components/Services';

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
      }
      
  }

  componentDidMount(){
    var pension = firebase.database().ref('Pensiones/'+this.props.target.ID);
    pension.once('value', (dataSnapshot)=>{

      var PenData = Object.values(dataSnapshot.val());
      var userID = Object.values(PenData[2])
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
      return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>{this.props.target.Alias}</Text>
        </View>
        <View style={styles.center}>
          <View style={styles.penInfo}>
            <Text>Boss: {this.state.user.Nombre} {this.state.user.Apellido}</Text>
            <Text>{this.props.target.Direccion}</Text>
            <Text>{this.props.target.Barrio}</Text>
            <Text>Servicios</Text>
            <Service data={this.props.target}/>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Seccion de Comentarios</Text>
          <Button
          title='Viviste aqui? Calificalo!'
          onPress={this._onPressCalificar}/>
        </View>
      </View>

);
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
