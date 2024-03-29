import React from 'react';
import { StyleSheet, Alert, View} from 'react-native';

import RootStack from './components/tools/Router';
import * as firebase from 'firebase';
import ApiKeys from './components/tools/ApiKeys';

import {isSignedIn, onSignOut} from './components/tools/Auth';
import { NavigationActions } from 'react-navigation';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducer from './components/tools/redux/Reducers';
const store = createStore(Reducer);


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state=({correo:'', contra:''});
  }

  componentDidMount(){
    if(!firebase.apps.length){
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    //onSignOut('Log');
  }

  
  render() {
    
    return (
      <Provider store={store}>
        <RootStack
          ref={nav => this.navigator =nav}/>
      </Provider>
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
