import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button as Btn} from 'react-native-elements';
import {Button, Icon, Fab } from 'native-base';
import Service from '../../components/Services';
import StarRating from 'react-native-star-rating';
import ComentLoaderBoss from '../../components/ComentLoaderBoss';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class PensionView extends React.Component {
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
      var owner = firebase.database().ref('Users/'+userID[15]+'/Account-Info');
      owner.once('value',(dataSnapshot)=>{
        this.setState({user: dataSnapshot.val()})
      })
      
    })
    pension = firebase.database().ref('Pensiones/'+this.props.target.ID+'/Comentarios');
    pension.once('value', (dataSnapShot)=>{
      var coments=[];
      dataSnapShot.forEach(element => {
        var coment = element.val();
        if (typeof element.val()==='object') {
          if(coment.ValidadoBoss==false){
            coments = coments.concat(element.val());
          }
          
        }
      })
      this.props.loadComents(coments)               
      });
    
    
  }

  _onPressRemovePension=()=>{
    firebase.database().ref('Pensiones/'+this.props.target.ID).remove();
    var query = firebase.database().ref('Pensiones/');
    query.once("value")
      .then((snapshot)=> {
        currentUser = firebase.auth().currentUser;
        var Pensiones=[];
        var find=[];
        snapshot.forEach((childSnapshot)=> {       
            find = find.concat(childSnapshot.val());
        });
        for(var i=0; i<find.length;i=i+1){
          var Pension=Object.values(find[i]);
          var PensionInfo = Object.values(Pension[2]);
          if(PensionInfo[15]==currentUser.uid){
              Pensiones=Pensiones.concat(Pension[2]);
          }
        }
      this.props.updateDataBoss(Pensiones);
      this.props.navigation.navigate('BossStart');
    });
  }
  _onPressAddCuarto=()=>{
    this.props.navigation.navigate('AddCuarto')
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
    this.props.navigation.navigate('CuartosView')
  }
  _onPressEditPension=()=>{
    this.props.navigation.navigate('EditPension')
  }
  _onPressCheckUsers=()=>{
    this.props.navigation.navigate('CheckUsers')
  }
  _doNothing=()=>{}

    render() {
      return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>{this.props.target.Alias}</Text>
        </View>
        <View style={styles.center}>
          <View style={styles.penInfo}>
          <StarRating
                disabled={true}
                maxStars={5}
                rating={this.props.target.Rating}
              />
            <Text>Boss: {this.state.user.Nombre} {this.state.user.Apellido}</Text>
            <Text>{this.props.target.Direccion}</Text>
            <Text>{this.props.target.Barrio}</Text>
            <Text>Servicios</Text>
            <Service data={this.props.target}/>
          </View>
          <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={styles.fab}
              position="bottomRight"
              onPress={this._onPressFab}>
              <Icon name="settings" />
              <Button style={styles.logOutButton}
                onPress={this._onPressVerCuartos}>
                <Icon name="ios-albums" />
              </Button>
              <Button style={styles.addButton}
                onPress={this._onPressAddCuarto}
                >
                <Icon name="ios-add-circle" />
              </Button>
              <Button style={styles.removeButton}
                onPress={this._onPressRemovePension}
                >
                <Icon name="ios-remove-circle-outline" />
              </Button>
              <Button style={styles.checkPersons}
                onPress={this._onPressCheckUsers}
                >
                <Icon name="nuclear" />
              </Button>
            </Fab>
            <Btn
              title='Editar'
              onPress={this._onPressEditPension}
              ></Btn>

          
          
        </View>
        <View style={styles.footer}>
          <Text>Seccion de Comentarios</Text>
          <ComentLoaderBoss comentarios={this.props.coments}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PensionView);
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
  removeButton:{
    backgroundColor: '#ff0000' 
  },
  accountButton:{
    backgroundColor: '#3B5998'
  }
});
