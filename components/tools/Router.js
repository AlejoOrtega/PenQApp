import React from "react";
import {createStackNavigator, createAppContainer, NavigationEvents, createSwitchNavigator} from 'react-navigation';

//Screens
import LogInScreen from '../../screens/LogIn'
import RegisterScreen from '../../screens/Register'
import ClientScreen from '../../screens/ClientFolder/ClientStart'
import BossScreen from '../../screens/BossFolder/BossStart'
import AccountBoss from "../../screens/BossFolder/AccountBoss";
import AccountClient from '../../screens/ClientFolder/AccountClient';
import AddPension from '../../screens/BossFolder/AddPension'

//Loggin Stack - Usuarios que no han iniciado sesion o no se han registrado
const LogStack = createStackNavigator({
  Login: {
    screen: LogInScreen,
    navigationOptions: () => ({
      header: null
    }),
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      header: null,
    }),
  }
},{
    initialRouteName: 'Login',
}
);

// Client Stack - Usuarios que han iniciado sesion y son tipo clientes
const ClientStack = createStackNavigator({
  ClientStart:{
    screen: ClientScreen,
    navigationOptions: () => ({
      header: null
    }),
  },
  AccountClient:{
    screen: AccountClient,
    navigationOptions: () => ({
      header: null,
    }),
  }
},{
  initialRouteName: 'ClientStart',
});

// Boss Stack - Usuarios que han iniciado sesion y son tipo dueños
const BossStack = createStackNavigator({
  BossStart:{
    screen: BossScreen,
    navigationOptions: () => ({
      header: null
    }),
  },
  AccountBoss:{
    screen: AccountBoss,
    navigationOptions: () => ({
      // header: null,
    }),
  },
  AddPension:{
    screen: AddPension,
    navigationOptions: () => ({
      // header: null,
    }),
  }
},{
  initialRouteName: 'BossStart',
});


// Root Stack - Stack principal para navegar entre stacks
const RootStack = createSwitchNavigator({
  Log: {screen: LogStack},
  Client:{screen: ClientStack},
  Boss: {screen: BossStack},
},
{
    initialRouteName: 'Log'
})


export default createAppContainer(RootStack);