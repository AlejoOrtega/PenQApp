import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, TextInput, Button, Modal, TouchableHighlight} from 'react-native';
import {isSignedIn,onSignIn} from '../../components/tools/Auth'
import firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';
import { Row } from 'native-base';

class AccountBoss extends Component {
    constructor(props) {
      super(props)
      
    }
    _goBack=()=>{
      this.props.navigation.navigate('BossStart');
    }
    _onPressEditAccount=()=>{
      this.props.navigation.navigate('Edit');
    }

    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                  <Text>Informacion de tu cuenta!</Text>
                </View>
                <View style={styles.center}>
                  <View style={styles.editar}>
                    <Text>Nombre: {this.props.user.nombre}</Text>
                  </View>
                  <View style={styles.editar}>
                    <Text>Apellido: {this.props.user.apellido}</Text>
                  </View>
                  <View style={styles.editar}>
                    <Text>Correo: {this.props.user.correo}</Text>
                  </View>
                </View>
                <View style={styles.footer}>
                  <Button
                    onPress={this._goBack}
                    title='Go Back'
                  />
                  <Text 
                    style={styles.edit}
                    onPress={this._onPressEditAccount}
                  >editar</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountBoss);

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
    editar:{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flex: 3,
    },
    footer:{
      flexDirection: 'row',
      alignItems: 'baseline',
      flex: 3,
    }
  });