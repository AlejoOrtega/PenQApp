import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, Button, Image, CameraRoll} from 'react-native';
import {isSignedIn,onSignIn} from '../../components/tools/Auth'
import firebase from 'firebase';

import ProfilePhoto from '../../components/ProfilePhoto';

import {ImagePicker, Permissions} from 'expo';



import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';



class Edit extends Component {
    constructor(props) {
      super(props)
      this.state={
        nombre:this.props.user.Nombre,
        apellido:this.props.user.Apellido,
      };
    }


    _changeNombre=(text)=>{
      this.setState({nombre: text});
    }
    _changeApellido=(text)=>{
      this.setState({apellido: text});
    }
    _onPressSendChanges=() =>{
      isSignedIn('Log').then((value)=>{
        value.Nombre=this.state.nombre;
        value.Apellido=this.state.apellido;
        onSignIn('Log',value).then().catch((err)=>alert(err));
        this.props.updateData(value);

        user = firebase.auth().currentUser;
        firebase.database().ref('Users/'+user.uid+'/Account-Info').update({
          Nombre: this.state.nombre,
          Apellido: this.state.apellido
        })
        this.props.navigation.navigate('AccountBoss');
      })
    }
    profileImage(){
    }

    askPermissionsAsync = async () => {
      await Permissions.askAsync(Permissions.CAMERA);
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      // you would probably do something to verify that permissions
      // are actually granted, but I'm skipping that for brevity
    };

    _onChangePicture= async ()=>{
      
      await this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync();
        if(!result.cancelled){
          let uid = firebase.auth().currentUser.uid;
          this.uploadImage2fire(result.uri, "ProfileImage"+uid)
          .then(()=>{
            alert("Great!");
          }).catch((error)=>{
            alert(error);
          })
        }
      
      
    }
    uploadImage2fire=async(uri, ImageName)=>{
      const blob = await new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
          resolve(xhr.response);
        };
        xhr.onerror = function(){
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET',uri,true);
        xhr.send(null);
      });
      let uid = firebase.auth().currentUser.uid;
      await firebase.storage().ref().child("Images/"+ImageName).put(blob);
      this.updateInfoUser(ImageName, uid);

      this.props.navigation.navigate("Edit",{render: true})
    }

    updateInfoUser = (name, uid)=>{
      firebase.storage().ref().child('Images/'+name).getDownloadURL().then(url=>{
        firebase.database().ref('Users/'+uid+'/Account-Info').update({
          photoUri: url,
        })
        firebase.database().ref('Users/'+uid+"/Account-Info").once('value',(data)=>{
          onSignIn('Log',data).then().catch((err)=>alert(err));
          this.props.updateData(data.val())
          console.log(data)
        })
      })
    }

    render(){
      return(
        <View style={styles.container}>
          <View style={styles.ChangePhoto}>
            <ProfilePhoto uri={this.props.user.photoUri} />
            <Button
              title="Cambiar Foto!"
              color='#7b68ee'
              onPress={this._onChangePicture} />
          </View>
          <View style={styles.center}>
          
            <View>
            <Text style = {{fontSize: 16}}>Nombre</Text>
              <TextInput
                style={styles.textInput}
                placeholder={this.props.user.Nombre}
                onChangeText={this._changeNombre}
              ></TextInput>
            </View>
            
            <View>
            <Text style = {{fontSize: 16}}>Apellido</Text>
              <TextInput
                style={styles.textInput}
                placeholder={this.props.user.Apellido}
                onChangeText={this._changeApellido}
              ></TextInput>
            </View>
          </View>
          <View style={styles.footer}>
            <Button
              title='Registrar cambios'
              color='#7b68ee'
              onPress={this._onPressSendChanges}
            />
          </View>
        </View>
      );        
    }
}

function mapStateToProps(state){
  const {user} = state;
  return{
    user
  };
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ChangePhoto:{
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    justifyContent: 'space-evenly',
    flex:2
  },
  textInput:{
    borderColor: 'black',
    height: '40%',
    backgroundColor: 'grey',
    borderRadius: 10,
    width: '100%',
    fontFamily:'sans-serif-medium',
  },
  edit:{
    color: 'blue',
    fontSize: 20,
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  center:{
    justifyContent: 'space-evenly',
    width: '90%',
    flex: 3,
  },
  footer:{
    justifyContent:'center',
    alignItems: 'center',
    flex: 3,
  }
});