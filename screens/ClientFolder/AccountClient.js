import React, { Component } from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
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
                <View style={styles.containerNF}>
                    <View style={styles.CircleShapeView}>
                        <ProfilePhoto uri = {this.props.user.photoUri}/>
                    </View>
                    <View style={styles.NombreYFoto}> 
                        <Text style={{ color: 'white', fontSize: 20 }}>{this.props.user.Nombre} {this.props.user.Apellido + '\n'}</Text>
                    </View>     
                </View>
            
            <View style={styles.center}>
                <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Informacion de tu cuenta</Text>
                <View style={styles.editar}>
                    <Text style={{ fontSize: 14}}>Correo: {this.props.user.Correo}</Text>
                    <Text style={{ fontSize: 14}}>Celular: {this.props.user.Celular}</Text>
                    <View style={styles.EditButton}>
                        <Button
                            title='Editar'
                            color='#7b68ee'
                            onPress={this._onPressEditAccount}
                        ></Button>
                    </View>
                    
                </View>
            </View>
            
            <View style={styles.footer}>
                <Button
                    title='Cerrar Sesion' 
                    style={styles.logOutButton}
                    color = '#7b68ee'
                    onPress={this._onPressLogOut}>
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
    center:{
    //   justifyContent: 'center',
        flex:0.9,
    },
    containerNF:{
        flex: 0.5,
      flexDirection: 'row',
      marginTop: '10%',
      marginHorizontal: 10,
      //alignItems: 'center',
      borderColor:'black',
    },
    editar:{
      width: 300,
      height: 200,
      borderColor:'black',
    },
    NombreYFoto:{
        flexDirection: 'row',
        height:100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#7b68ee',
        flex: 2,
      },
    footer:{
        flex:0.2,
    },
    logOutButton:{
        width: 200,
        height: 50,
    },
    EditButton:{
        marginTop: 10,
        width: 100,
        height: 50,
        alignItems: 'baseline'
    },

    CircleShapeView: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'grey'
    }    
  });