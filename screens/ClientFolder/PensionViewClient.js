import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableHighlight, ScrollView, Linking } from 'react-native';
import Service from '../../components/Services';
import StarRating from 'react-native-star-rating';
import ComentsLoader from '../../components/ComentsLoader';
import SwiperC from '../../components/SwiperC';

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
    pics=[this.props.target.Url1,this.props.target.Url2,this.props.target.Url3]
    this.props.loadPics(pics)
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
  makeCall=()=>{
    Linking.openURL('tel:'+this.state.user.Celular)
  }


  render() {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <SwiperC  pictures = {this.props.pics}/>
          </View>
          <View style={styles.CalificacionSty}>
          <TouchableHighlight
                onPress={this._onPressRating}>
                <View style={{flexDirection:'row'}}>
                <StarRating
              disabled={true}
              fullStarColor={'#fccb00'}
              maxStars={5}
              rating={this.props.target.Rating}
            />
            <Image
                  style={{width:25, height:25, marginLeft:'5%', alignSelf:'center'}}
                  source={require('../Image/aprovechar.png')}/>
                </View>
                
          </TouchableHighlight>
          
          

          </View>
          <View style={styles.center}>
            <View style={styles.penInfo}>
              <Text style = {{fontSize: 30, fontWeight: 'bold', alignSelf: 'center'}}>{this.props.target.Alias}</Text>
              <View style = {styles.InfoPen}>


              
                
                <Text style = {{fontSize: 20}}><Text style = {{fontWeight:'bold'}}>Administrador:</Text> {this.state.user.Nombre} {this.state.user.Apellido}</Text>
                <View style={{flexDirection:'row'}}>
                  <TouchableHighlight
                  onPress={this.makeCall}>
                  <Text style = {{fontSize: 20, backgroundColor:'#f0e6f8'}}><Text style = {{fontWeight:'bold'}}>Celular:</Text> {this.state.user.Celular}</Text>
                  </TouchableHighlight>
                  <Image
                  style={{width:25, height:25, marginLeft:'20%'}}
                  source={require('../Image/aprovechar.png')}/>
                </View>
                <Text style = {{fontSize: 20}}><Text style = {{fontWeight:'bold'}}>Dirección:</Text> {this.props.target.Direccion}</Text>
                <Text style = {{fontSize: 20}}><Text style = {{fontWeight:'bold'}}>Barrio:</Text> {this.props.target.Barrio}</Text>
                <Text style = {{fontSize: 20}}><Text style = {{fontWeight:'bold'}}>Observaciones:</Text> {this.props.target.Especific}</Text>
                <Text style = {{fontSize: 20}}><Text style = {{fontWeight:'bold'}}>Reglas:</Text> {this.props.target.Reglas}</Text>
                <Text style = {{fontWeight:'bold', fontSize: 20}}>Servicios:</Text>
                <Service data={this.props.target} />
                <View style={styles.EditButton}>
                  <Button
                    style = {{width: 200, height: 50}}
                    title="¡Ver Cuartos!"
                    color = '#8A2BE2' 
                    onPress={this._onPressVerCuartos} />
              </View>
              </View>
              
              
            </View>
            
          </View>
          <View style={styles.footer}>
            <Text style = {{fontSize: 30, fontWeight: 'bold'}}>Comentarios</Text>
            <ComentsLoader onPressCalificar={this._onPressCalificar} tipo="cliente"/>
          </View>
        </ScrollView>
      );

    }
  
}

function mapStateToProps(state){
  const {target, coments, pics}=state;
  return {
    target,
    coments,
    pics
  };
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch),
    updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
    loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
    loadComents: bindActionCreators(Actions.loadComents,dispatch),
    loadPics: bindActionCreators(Actions.pics,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PensionViewClient);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    borderBottomWidth:4,

  },
  InfoPen:{
    justifyContent:'center',
    paddingHorizontal: 5,
    fontSize: 14,
    margin: 5,
    
  },
  CalificacionSty:{
    justifyContent:'center',
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
