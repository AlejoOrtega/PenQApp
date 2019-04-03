import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';

//Screens
//Log Module
import LogInScreen from '../../screens/LogIn'
import RegisterScreen from '../../screens/Register'
//Boss Module
import BossScreen from '../../screens/BossFolder/BossStart';
import AccountBoss from "../../screens/BossFolder/AccountBoss";
import AddPension from '../../screens/BossFolder/AddPension';
import Edit from '../../screens/BossFolder/Edit';
import LocatePension from '../../screens/BossFolder/LocatePension';
import PensionView from '../../screens/BossFolder/PensionView';
import EditPension from '../../screens/BossFolder/EditPension';
//Client Module
import ClientScreen from '../../screens/ClientFolder/ClientStart';
import AccountClient from '../../screens/ClientFolder/AccountClient';
import EngineSearch from '../../screens/ClientFolder/EngineSearch';


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
const ClientStack = createBottomTabNavigator({
  Engine:{
    screen: EngineSearch,
    navigationOptions: () => ({
      title: 'Busqueda'
    }),
  },ClientStart:{
    screen: ClientScreen,
    navigationOptions: () => ({
      title: 'Map'
    }),
  },
  AccountClient:{
    screen: AccountClient,
    navigationOptions: () => ({
      title: 'Cuenta'
    }),
  },
  
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'ClientStart') {
        iconName = 'md-map';
      } else if (routeName === 'AccountClient') {
        iconName = 'ios-contact';
      }else if (routeName === 'Engine') {
        iconName = 'ios-search';
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'blue',
    inactiveTintColor: 'gray',
  },
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
  AddPension:{
    screen: AddPension,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Locate:{
    screen: LocatePension,
    navigationOptions: () => ({
      header: null,
    }),
  },
  PensionView:{
    screen: PensionView,
    navigationOptions: () => ({
      header: null,
    }),
  },
  EditPension:{
    screen: EditPension,
    navigationOptions: () => ({
      header: null,
    }),
  },
  AccountBoss:{
    screen: AccountBoss,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Edit:{
    screen: Edit,
    navigationOptions: () => ({
      header: null,
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