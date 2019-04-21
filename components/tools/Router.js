import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';

//Screens

//Log Module
import LogInScreen from '../../screens/LogIn';
import RegisterScreen from '../../screens/Register';

//Boss Module
import BossScreen from '../../screens/BossFolder/BossStart';
import AccountBoss from "../../screens/BossFolder/AccountBoss";
import AddPension from '../../screens/BossFolder/AddPension';
import Edit from '../../screens/BossFolder/Edit';
import LocatePension from '../../screens/BossFolder/LocatePension';
import PensionView from '../../screens/BossFolder/PensionView';
import EditPension from '../../screens/BossFolder/EditPension';
import AddCuarto from '../../screens/BossFolder/AddCuarto';
import CuartosView from '../../screens/BossFolder/CuartosView';
import ViewCuarto from '../../screens/BossFolder/ViewCuarto';
import EditionCuarto from '../../screens/BossFolder/EditionCuarto';
import CameraBoss from '../../screens/BossFolder/CameraBoss';

//Client Module
import PensionViewClient from '../../screens/ClientFolder/PensionViewClient'
import ClientMap from '../../screens/ClientFolder/ClientMap'
import EditClient from '../../screens/ClientFolder/EditClient';
import ClientScreen from '../../screens/ClientFolder/ClientStart';
import AccountClient from '../../screens/ClientFolder/AccountClient';
import EngineSearch from '../../screens/ClientFolder/EngineSearch';
import resultPension from '../../screens/ClientFolder/resultPension';
import resultCuarto from '../../screens/ClientFolder/resultCuarto';
import RatingPension from '../../screens/ClientFolder/RatingPension';


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

const ClientAccountStack = createStackNavigator({
  AccountClient: {
    screen: AccountClient,
    navigationOptions: () => ({
      header: null
    }),
  },
  EditClient: {
    screen: EditClient,
    navigationOptions: () => ({
      header: null
    }),
  }
},{
    initialRouteName: 'AccountClient',
});

const ClientMapStack = createStackNavigator({
  ClientMapaView:{
    screen: ClientMap,
    navigationOptions: () => ({
      header: null
    }),
  },
  PensionViewClient:{
    screen: PensionViewClient,
    navigationOptions: () => ({
      header: null
    }),
  },
  Rating:{
    screen: RatingPension,
    navigationOptions: () => ({
      header: null
    }),
  }
},{
    initialRouteName: 'ClientMapaView',
});

const EngineStack = createStackNavigator({
  Engine:{
    screen: EngineSearch,
    navigationOptions:()=>({
      header:null
    })
  },
  resultPen:{
    screen: resultPension,
    navigationOptions:()=>({
      header:null
    })
  },
  resultCua:{
    screen: resultCuarto,
    navigationOptions:()=>({
      header:null
    })
  }
},{
  initialRouteName: 'Engine',
})

// Client Stack - Usuarios que han iniciado sesion y son tipo clientes
const ClientStack = createBottomTabNavigator({
  Engine:{
    screen: EngineStack,
    navigationOptions: () => ({
      title: 'Busqueda'
    }),
  },ClientMapa:{
    screen: ClientMapStack,
    navigationOptions: () => ({
      title: 'Map'
    }),
  },ClientStart:{
    screen: ClientScreen,
    navigationOptions: () => ({
      title: 'Inicio'
    }),
  },
  Account:{
    screen: ClientAccountStack,
    navigationOptions: () => ({
      title: 'Cuenta'
    }),
  }

  
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'ClientStart') {
        iconName = 'ios-home';
      } else if (routeName === 'Account') {
        iconName = 'ios-contact';
      }else if (routeName === 'Engine') {
        iconName = 'ios-search';
      }else if (routeName === 'ClientMapa'){
        iconName = 'md-map';
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
  },
  AddCuarto:{
    screen: AddCuarto,
    navigationOptions: () => ({
      header: null,
    }),
  },
  CuartosView:{
    screen: CuartosView,
    navigationOptions: () => ({
      header: null,
    }),
  },
  ViewCuarto:{
    screen: ViewCuarto,
    navigationOptions: () => ({
      header: null,
    }),
  },
  EditionCuarto:{
    screen: EditionCuarto,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Camera:{
    screen: CameraBoss,
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