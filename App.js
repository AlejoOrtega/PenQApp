import React from 'react';
import { StyleSheet, Alert} from 'react-native';

import RootStack from './components/tools/Router';
import * as firebase from 'firebase';
import ApiKeys from './components/tools/ApiKeys';

import {isSignedIn, onSignOut} from './components/tools/Auth';
import { NavigationActions } from 'react-navigation';


export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  async componentDidMount(){
    if(!firebase.apps.length){
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    
    await isSignedIn('Log').then((value) => {
      if(value != 'empty'){
         firebase.auth().signInWithEmailAndPassword(value.correo, value.contra);
        if(value.type ==0){
          this.navigator &&
            this.navigator.dispatch(
              NavigationActions.navigate({routeName: 'ClientStart'})
            );
        }else if(value.type ==1){
          this.navigator &&
            this.navigator.dispatch(
              NavigationActions.navigate({routeName: 'BossStart'})
            );
        }
      }
    }).catch();
  }

  
  render() {
    
    return (
      <RootStack
      ref={nav => this.navigator =nav}/>
      
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
