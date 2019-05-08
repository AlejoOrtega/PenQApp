import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, Button as Btn } from 'react-native';
import {} from 'react-native-elements';
import {Button, Icon, Fab } from 'native-base';
import Service from '../../components/Services';
import StarRating from 'react-native-star-rating';
import ComentLoaderBoss from '../../components/ComentLoaderBoss';
import * as firebase from 'firebase';
import ImagesSwiper from "react-native-image-swiper";

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
          if(coment.ValidadoBoss==false){
            coments = coments.concat(element.val());
          }
          
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
          var PensionInfo = Pension[2];
          if(PensionInfo.bossID==currentUser.uid){
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

  _onPressRating=()=>{
    this.props.navigation.navigate('ViewRating')
  }

    render() {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <SwiperC
              pictures={this.props.pics} />

          </View>
          <View style={styles.CalificacionSty}>
            <TouchableHighlight
              onPress={this._onPressRating}>
              <StarRating
                disabled={true}
                fullStarColor={'#fccb00'}
                maxStars={5}
                rating={this.props.target.Rating}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.center}>
            <View style={styles.penInfo}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center' }}>{this.props.target.Alias}</Text>
              <View style={styles.InfoPen}>

                <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>Administrador:</Text> {this.state.user.Nombre} {this.state.user.Apellido}</Text>

                <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>Direccion:</Text> {this.props.target.Direccion}</Text>
                <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>Barrio:</Text> {this.props.target.Barrio}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Servicios:</Text>
                <Service data={this.props.target} />
                <View>
                  <Btn
                    style={{ width: 200, height: 50, marginBottom: '5%' }}
                    title='Editar'
                    color='#7b68ee'
                    onPress={this._onPressEditPension}
                  ></Btn>
                </View>
                <View style={styles.EditButton}>
                  <Btn
                    style={{ width: 200, height: 50 }}
                    title="Ver Cuartos!"
                    color='#8A2BE2'
                    onPress={this._onPressVerCuartos} />
                </View>
              </View>

            </View>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
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
    
  },
  CalificacionSty:{
    justifyContent: 'center',
    //alignItems:'center',
    flexDirection:'row', 
    marginTop: 10
  },
  EditButton:{
    margin: 10
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
    justifyContent: 'flex-end',
    alignItems:'center',
    width: '100%'
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
