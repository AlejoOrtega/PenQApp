import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, TextInput, Button} from 'react-native';
import {isSignedIn,onSignIn} from '../../components/tools/Auth'
import firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class Edit extends Component {
    constructor(props) {
      super(props)
      this.state={
        nombre:this.props.user.nombre,
        apellido:this.props.user.apellido,
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
        value.nombre=this.state.nombre;
        value.apellido=this.state.apellido;
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
    render(){
      return(
        <View style={styles.container}>
                <View style={styles.header}>
                  <Text>Modifica los datos de tu cuenta!</Text>
                </View>
                <View style={styles.center}>
                  <Text>Nombre</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={this.props.user.nombre}
                    onChangeText={this._changeNombre}
                  ></TextInput>
                  <Text>Apellido</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={this.props.user.apellido}
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

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