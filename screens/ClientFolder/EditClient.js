import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {isSignedIn,onSignIn} from '../../components/tools/Auth'
import firebase from 'firebase';

import {ImagePicker} from 'expo';

import ProfilePhoto from '../../components/ProfilePhoto';
import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class EditClient extends Component {
    constructor(props) {
      super(props)
      this.state={
        nombre:this.props.user.nombre,
        apellido:this.props.user.apellido,
      };
    }


    _onChangePicture= async ()=>{

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

      this.props.navigation.navigate("EditClient",{render: true})
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
    _changeNombre=(text)=>{
      this.setState({nombre: text});
    }
    _changeApellido=(text)=>{
      this.setState({apellido: text});
    }
    _onPressSendChanges=() =>{
      isSignedIn('Log').then((value)=>{
        value.nombre=this.state.nombre;
        value.apellido=this.state.apellido;
        onSignIn('Log',value).then().catch((err)=>alert(err));
        this.props.updateData(value);

        user = firebase.auth().currentUser;
        firebase.database().ref('Users/'+user.uid+'/Account-Info').update({
          Nombre: this.state.nombre,
          Apellido: this.state.apellido
        })
        this.props.navigation.navigate('AccountClient');
      })
    }
    render(){
      return(
        <View style={styles.container}>
                <View style={styles.header}>
                  <Text>Modifica los datos de tu cuenta!</Text>
                </View>
                <View style={styles.center}>
                <ProfilePhoto uri={this.props.user.photoUri}/>
                <Button
                  title="Cambiar Foto!"
                  onPress={this._onChangePicture}/>
                  <Text>Nombre</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={this.props.user.Nombre}
                    onChangeText={this._changeNombre}
                  ></TextInput>
                  <Text>Apellido</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={this.props.user.Apellido}
                    onChangeText={this._changeApellido}
                  ></TextInput>
                </View>
                <View style={styles.footer}>
                  <Button
                  title='Registrar cambios'
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

export default connect(mapStateToProps, mapDispatchToProps)(EditClient);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    borderColor: 'black',
    backgroundColor: 'grey',
  },
  edit:{
    color: 'blue',
    fontSize: 20,
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  center:{
    justifyContent: 'center',
    flex: 3,
  },
  footer:{
    flexDirection: 'row',
    alignItems: 'baseline',
    flex: 3,
  }
});