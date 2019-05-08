import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import {Button, Icon, Fab } from 'native-base';
import {onSignOut} from '../../components/tools/Auth';
import firebase from 'firebase';

import Cards from '../../components/CardList';


import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';



 class BossStart extends Component {
  constructor(props) {
    super(props)

    this.state={
      active:false,
    }

    
    
  }
  
  _onPressPension=(pension)=>{
    this.props.pensionTarget(pension);
    this.props.navigation.navigate('PensionView');
  }

  _onPressAccount=()=>{
    this.props.navigation.navigate('AccountBoss');
  }
  _onPressAddPension=()=>{
    this.props.navigation.navigate('AddPension');
  }
  _onPressLogOut=()=>{
    onSignOut('Log').then(()=>{
      firebase.auth().signOut();
      this.props.navigation.navigate('Login');
    }).catch((err)=>alert(err));
  }
  _onPressFab=()=>{
    this.setState({ active: !this.state.active });
  }

  render() {
    return (  
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20}}>{'Hola! '+ this.props.user.Nombre + ' ' +  this.props.user.Apellido}</Text>
          <Text style={{ fontSize: 20}}> Estas son tus Pensiones</Text>
        </View>
        <View style={styles.center}>
          <Cards data={this.props.pensiones} Press={this._onPressPension}
          />
        </View>
      </View>
        
    );
  }
}



function mapStateToProps(state){
  const {user, pensiones} = state;
  return{
    user,
    pensiones
  };
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch),
    pensionTarget: bindActionCreators(Actions.pensionTarget, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BossStart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'lightblue',
  },
  center:{
    alignItems: 'center',
    flex: 5,
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