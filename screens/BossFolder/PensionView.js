import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, Button, Alert, Image } from 'react-native';
import {} from 'react-native-elements';
import Service from '../../components/Services';
import StarRating from 'react-native-star-rating';
import ComentLoaderBoss from '../../components/ComentLoaderBoss';
import * as firebase from 'firebase';

import SwiperC from '../../components/SwiperC';


import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';
const customImg = [];
class PensionView extends React.Component {
  constructor(props){
      super(props);

      this.state={
        user:'',
        comida: this.props.target.Comida,
        render:false,
        pictures:[],
        active:false,
      }
      
  }


  componentDidMount(){
    var pension = firebase.database().ref('Pensiones/'+this.props.target.ID);
    pension.once('value', (dataSnapshot)=>{

      var PenData = Object.values(dataSnapshot.val());
      var userID = PenData[2]
      var owner = firebase.database().ref('Users/'+userID.bossID+'/Account-Info');
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

            coments = coments.concat(coment);
          
          
        }
      })
      this.props.loadComents(coments)               
      });
      
    
    this.props.uploadPicture1(this.props.target.Url1);
    this.props.uploadPicture2(this.props.target.Url2);
    this.props.uploadPicture3(this.props.target.Url3);
    pics=[this.props.target.Url1,this.props.target.Url2,this.props.target.Url3];
    this.props.uploadPics(pics)
  }

  removePension=()=>{
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
          var PensionInfo = Pension[2];
          if(PensionInfo.bossID==currentUser.uid){
              Pensiones=Pensiones.concat(Pension[2]);
          }
        }
      this.props.updateDataBoss(Pensiones);
      this.props.navigation.navigate('BossStart');
    });
  }

  _onPressRemovePension=()=>{
    Alert.alert(
      'Cuidado!',
      'Seguro deseas eliminar esta pension?',
      [
        {
          text: 'No',
          onPress: () => console.log('Operation Aborted'),
          style: 'cancel',
        },
        {text: 'Si', onPress: () => this.removePension},
      ],
      {cancelable: false},
    );
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

  _onPressRating=()=>{
    this.props.navigation.navigate('ViewBossRating')
  }
  _onPressFab=()=>{
    this.setState({ active: !this.state.active });
  }

    render() {
      return (
        
        <ScrollView>
          <View style={styles.header}>
            <SwiperC
              pictures={this.props.pics} />

          </View>
          <View style={styles.CalificacionSty}>
            <TouchableHighlight
              onPress={this._onPressRating}>
              <View style={{ flexDirection: 'row' }}>
                <StarRating
                  disabled={true}
                  fullStarColor={'#fccb00'}
                  maxStars={5}
                  rating={this.props.target.Rating}
                />
                <Image
                  style={{ width: 25, height: 25, marginLeft: '5%', alignSelf: 'center' }}
                  source={require('../Image/aprovechar.png')} />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.center}>
            <View style={styles.penInfo}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center' }}>{this.props.target.Alias}</Text>
              <View style={styles.InfoPen}>

                <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>Administrador:</Text> {this.state.user.Nombre} {this.state.user.Apellido}</Text>
                <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>Celular:</Text> {this.state.user.Celular}</Text>
                <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>Direccion:</Text> {this.props.target.Direccion}</Text>
                <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>Barrio:</Text> {this.props.target.Barrio}</Text>
                <Text style = {{fontSize: 20}}><Text style = {{fontWeight:'bold'}}>Observaciones:</Text> {this.props.target.Especific}</Text>
                <Text style = {{fontSize: 20}}><Text style = {{fontWeight:'bold'}}>Reglas:</Text> {this.props.target.Reglas}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Servicios:</Text>
                <View style={{width:'100%'}}>
                  <Service data={this.props.target} />
                </View>
                
              <View style={{justifyContent:'space-between'}}>
                <View style={{flexDirection:'row-reverse', width:'95%', justifyContent:'space-between', alignItems: 'center', margin: 10}}>
                  <Button
                      style={{ width: '50%', height: 50, marginBottom: '5%' }}
                      title='Verificar Inquilinos'
                      color='#8e54c4'
                      onPress={this._onPressCheckUsers}
                    />
                  <Button
                    style={{ width: '50%', height: 50, marginBottom: '5%' }}
                    title='Editar'
                    color='#a666e2'
                    onPress={this._onPressEditPension}
                  />
                  
                </View>
                  <View style={styles.EditButton}>
                    <Button
                      style={{ width: 200, height: 50 }}
                      title="Ver Cuartos!"
                      color='#8A2BE2'
                      onPress={this._onPressVerCuartos} />
                      <Button
                    style={{ width: '50%', height: 50, marginBottom: '5%' }}
                    title='Eliminar Pension'
                    color='#c81d11'
                    onPress={this._onPressRemovePension}
                  />
                  </View>
                </View>
              </View>

            </View>
            



          </View>
          <View style={styles.footer}>
            <Text style = {{fontSize: 30, fontWeight: 'bold'}}>Comentarios</Text>
            <ComentLoaderBoss comentarios={this.props.coments} />
          </View>
        </ScrollView>

);
  }
}

function mapStateToProps(state){
  const {target, coments, picture1, picture2, picture3, pics}=state;
  return {
    target,
    coments,
    picture1, 
    picture2,
    picture3,
    pics
  };
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch),
    updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
    loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
    loadComents: bindActionCreators(Actions.loadComents,dispatch),
    uploadPicture1: bindActionCreators(Actions.picture1, dispatch),
    uploadPicture2: bindActionCreators(Actions.picture2, dispatch),
    uploadPicture3: bindActionCreators(Actions.picture3, dispatch),
    uploadPics: bindActionCreators(Actions.pics,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PensionView);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  InfoPen:{
    justifyContent:'center',
    paddingHorizontal: 5,
    fontSize: 14,
    margin: 5,
    width:'100%',
    
  },
  CalificacionSty:{
    justifyContent: 'center',
    //alignItems:'center',
    flexDirection:'row', 
    marginTop: 10
  },
  EditButton:{
    margin: 10,
    height:100,
    justifyContent:'space-between'
  },
  logo:{
    height: 300
  },
  center:{
    marginTop:5,
    justifyContent:'center'
  },
  penOpt:{
    justifyContent: 'center',
  },
  footer:{
    justifyContent:'center',
    alignItems:'center',
    width: '100%',

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
