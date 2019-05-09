import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {isSignedIn,onSignIn} from '../../components/tools/Auth'
import firebase from 'firebase';
import Load from '../../components/Load';

import {ImagePicker} from 'expo';

import ProfilePhoto from '../../components/ProfilePhoto';
import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class EditClient extends Component {
    constructor(props) {
      super(props)
      this.state={
        nombre:this.props.user.Nombre,
        apellido:this.props.user.Apellido,
        celular: this.props.user.Celular,
        loading: false
      };
    }


    _onChangePicture= async ()=>{

        let result = await ImagePicker.launchImageLibraryAsync();
        if(!result.cancelled){
          this.setState({loading:true})
          let uid = firebase.auth().currentUser.uid;
          this.uploadImage2fire(result.uri, "ProfileImage"+uid)
          .then(()=>{
            this.setState({loading:false})
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
    _changeCell=(text)=>{
      this.setState({celular: text});
    }
    _onPressSendChanges=() =>{
      this.setState({loading:true})
      isSignedIn('Log').then((value)=>{
        value.Nombre=this.state.nombre;
        value.Apellido=this.state.apellido;
        onSignIn('Log',value).then().catch((err)=>alert(err));
        this.props.updateData(value);

        user = firebase.auth().currentUser;
        firebase.database().ref('Users/'+user.uid+'/Account-Info').update({
          Nombre: this.state.nombre,
          Apellido: this.state.apellido,
          Celular: this.state.celular
        })
        this.setState({loading:false})
        this.props.navigation.navigate('AccountClient');
      })
    }
    render(){
      if(this.state.loading){
        return(
          <View style={styles.loading}>
            <Load/>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>Estamos cargando tu informacion!</Text>
        </View>
        );
      }else{
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
              <View>
              <Text style = {{fontSize: 16}}>Celular</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={this.props.user.Celular}
                  onChangeText={this._changeCell}
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
  ChangePhoto:{
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    justifyContent: 'space-evenly',
    flex:3
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
    flex: 2,
  },
  loading:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
});