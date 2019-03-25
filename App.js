import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';

import RootStack from './components/tools/Router';
import * as firebase from 'firebase';
import ApiKeys from './components/tools/ApiKeys';

// Redux Falta
import {createStore} from 'redux';
import {Provider} from 'react-redux'

export default class App extends React.Component {
  constructor(props){
    super(props);

    if(!firebase.apps.length){firebase.initializeApp(ApiKeys.FirebaseConfig);}
  }
  
  render() {
    return (
      <RootStack/>
      // <Provider store={store}>
      //   <RootStack/>
      // </Provider>
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
