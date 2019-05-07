import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Icon } from 'native-base';
import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {onSignOut} from '../../components/tools/Auth';
import {bindActionCreators} from 'redux';
import firebase from 'firebase';

import ProfilePhoto from '../../components/ProfilePhoto';

class AccountClient extends Component {
    constructor(props) {
        super(props)
    }

    _goBack = () => {
        this.props.navigation.navigate('ClientStart');
    }
    _onPressEditAccount = () => {
        this.props.navigation.navigate('EditClient');
    }

    _onPressLogOut = () => {
        onSignOut('Log').then(() => {
            firebase.auth().signOut();
            this.props.navigation.navigate('Login');
        }).catch((err) => alert(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>Informacion de tu cuenta!</Text>
                    <ProfilePhoto uri={this.props.user.photoUri}/>
                </View>
                <View style={styles.center}>
                    <View style={styles.editar}>
                        <Text>Nombre: {this.props.user.Nombre}</Text>
                    </View>
                    <View style={styles.editar}>
                        <Text>Apellido: {this.props.user.Apellido}</Text>
                    </View>
                    <View style={styles.editar}>
                        <Text>Correo: {this.props.user.Correo}</Text>
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
                <View style={styles.footer}>
                    <Button style={styles.logOutButton}
                        onPress={this._onPressLogOut}>
                        <Icon name="log-out" />
                    </Button>
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
  
function mapDispatchToProps(dispatch) {
    return {
        updateData: bindActionCreators(Actions.updateData, dispatch)
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AccountClient);

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
    },
    logOutButton:{
        backgroundColor: '#DD5144',
    },
  });