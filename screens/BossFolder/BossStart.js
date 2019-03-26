import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Button, Icon, Fab } from 'native-base';
import {onSignOut, isSignedIn} from '../../components/tools/Auth';
import firebase from 'firebase';


export default class FABExample extends Component {
  constructor(props) {
    super(props)

    this.state={
      active:false,
      nombre:'',
      apellido:'',
      correo:'',
      contra:'',
    }
    
  }
  componentWillMount(){
    isSignedIn('Log').then((value)=>{
      const data = Object.values(value);
      this.setState({
        nombre: data[3],
        apellido: data[4],
        correo:data[0],
        contra:data[1]
      });
    }).catch((err)=>alert(err));
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
    this.setState({ active: !this.state.active })
  }

  render() {
    return (  
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>{'Hola! '+this.state.nombre + ' '+ this.state.apellido}</Text>
          <Text>Tus Pensiones</Text>
        </View>
        <View style={styles.center}>

        </View>
        <View style={styles.footer}>
        <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={styles.fab}
              position="bottomRight"
              onPress={this._onPressFab}>
              <Icon name="settings" />
              <Button style={styles.logOutButton}
                onPress={this._onPressLogOut}>
                <Icon name="log-out" />
              </Button>
              <Button style={styles.addButton}
                onPress={this._onPressAddPension}
                >
                <Icon name="add" />
              </Button>
              <Button style={styles.accountButton}
                onPress={this._onPressAccount}>
                <Icon name="person" />
              </Button>
            </Fab>
        </View>
      </View>
        
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'blue',
  },
  center:{
    justifyContent: 'center',
    flex: 3,
  },
  footer:{
    alignItems: 'baseline',
    flex: 3,
  },
  fab:{
    backgroundColor: '#5067FF', 
  },
  logOutButton:{
    backgroundColor: '#DD5144' 
  },
  addButton:{
    backgroundColor: '#34A34F' 
  },
  accountButton:{
    backgroundColor: '#3B5998'
  }
});