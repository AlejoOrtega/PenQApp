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
import CheckUsers from '../../screens/BossFolder/CheckUsers';
import ViewBossRating from '../../screens/BossFolder/ViewRatingBoss';

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
import ListaCuartos from '../../screens/ClientFolder/ListaCuartos';
import VerCuarto from '../../screens/ClientFolder/VerCuarto';
import ViewRating from '../../screens/ClientFolder/ViewRating';


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
      title : 'Registro',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  }
},{
    initialRouteName: 'Login',
    headerLayoutPreset: 'center'
}
);

const ClientAccountStack = createStackNavigator({
  AccountClient: {
    screen: AccountClient,
    navigationOptions: () => ({
      title : 'Perfil',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  EditClient: {
    screen: EditClient,
    navigationOptions: () => ({
      title : 'Editar Datos',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  }
},{
    initialRouteName: 'AccountClient',
    headerLayoutPreset: 'center'
});

const ClientMapStack = createStackNavigator({
  ClientMapaView:{
    screen: ClientMap,
    navigationOptions: () => ({
      title : 'Mapa',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  PensionViewClient:{
    screen: PensionViewClient,
    navigationOptions: () => ({
      title : 'Pensión',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  Rating:{
    screen: RatingPension,
    navigationOptions: () => ({
      title : 'Calificar Pensión',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  ListaCuartos:{
    screen: ListaCuartos,
    navigationOptions: () => ({
      title : 'Cuartos',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  VerCuarto:{
    screen: VerCuarto,
    navigationOptions: () => ({
      title : 'Cuarto',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  ViewRating:{
    screen: ViewRating,
    navigationOptions: () => ({
      title : 'Calificación por criterios',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  }
},{
    initialRouteName: 'ClientMapaView',
    headerLayoutPreset: 'center'
});

const EngineStack = createStackNavigator({
  Engine:{
    screen: EngineSearch,
    navigationOptions:()=>({
      title : 'Búsqueda',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    })
  },
  resultPen:{
    screen: resultPension,
    navigationOptions:()=>({
      title : 'Resultados',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    })
  },
  resultCua:{
    screen: resultCuarto,
    navigationOptions:()=>({
      title : 'Resultados',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    })
  }
},{
  initialRouteName: 'Engine',
  headerLayoutPreset: 'center'
})

const ClientStartStack = createStackNavigator({
  ClientStart: {
    screen: ClientScreen,
    navigationOptions: () => ({
      title : 'Bienvenido!!',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  }
},{
    initialRouteName: 'ClientStart',
    headerLayoutPreset: 'center'
}
);

// Client Stack - Usuarios que han iniciado sesion y son tipo clientes
const ClientStack = createBottomTabNavigator({
  Engine:{
    screen: EngineStack,
    navigationOptions: () => ({
      title: 'Búsqueda'
    }),
  },ClientMapa:{
    screen: ClientMapStack,
    navigationOptions: () => ({
      title: 'Mapa'
    }),
  },ClientStart:{
    screen: ClientStartStack,
    navigationOptions: () => ({
      title: 'Inicio'
    }),
  },
  Account:{
    screen: ClientAccountStack,
    navigationOptions: () => ({
      title: 'Perfil'
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
    activeTintColor: '#7b449a',
    inactiveTintColor: '#d4a3ef',
  },
},{
  initialRouteName: 'ClientStart',
  headerLayoutPreset: 'center'
});

const profile = createStackNavigator({
  AccountBoss:{
    screen: AccountBoss,
    navigationOptions: () => ({
      title : 'Mi Perfil',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  Edit:{
    screen: Edit,
    navigationOptions: () => ({
      title : 'Editar Datos',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
},{
  initialRouteName: 'AccountBoss',
  headerLayoutPreset: 'center'
})
const homeStack = createStackNavigator({
  BossStart:{
    screen: BossScreen,
    navigationOptions: () => ({
      title : 'Bienvenido!!',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  PensionView:{
    screen: PensionView,
    navigationOptions: () => ({
      title : 'Pensión',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  EditPension:{
    screen: EditPension,
    navigationOptions: () => ({
      title : 'Editar Pensión',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  AddCuarto:{
    screen: AddCuarto,
    navigationOptions: () => ({
      title : 'Agregar cuarto',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  CuartosView:{
    screen: CuartosView,
    navigationOptions: () => ({
      title : 'Cuartos',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  ViewCuarto:{
    screen: ViewCuarto,
    navigationOptions: () => ({
      title : 'Cuarto',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  EditionCuarto:{
    screen: EditionCuarto,
    navigationOptions: () => ({
      title : 'Editar cuarto',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  CheckUsers:{
    screen: CheckUsers,
    navigationOptions: () => ({
      title : 'Verificar inquilinos',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  ViewBossRating:{
    screen: ViewBossRating,
    navigationOptions: () => ({
      title : 'Rating',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
},{
  initialRouteName: 'BossStart',
  headerLayoutPreset: 'center'
})

const AddPensionStack = createStackNavigator({
  AddPension: {
    screen: AddPension,
    navigationOptions: () => ({
      title : 'Agregar Pension',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  Locate:{
    screen: LocatePension,
    navigationOptions: () => ({
      title : 'Ubica tu pensión!!',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
},{
    initialRouteName: 'AddPension',
    headerLayoutPreset: 'center'
}
);
const BossTav = createBottomTabNavigator({
  AddPension:{
    screen: AddPensionStack,
    navigationOptions: () => ({
      title: "Agregar pensión"
    }),
  },Home:{
    screen: homeStack,
    navigationOptions: () => ({
      title: 'Inicio'
    }),
  },Profile:{
    screen: profile,
    navigationOptions: () => ({
      title: 'Perfil'
    }),
  }
  
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'ios-home';
      } else if (routeName === 'Profile') {
        iconName = 'ios-contact';
      }else if (routeName === 'AddPension') {
        iconName = 'ios-add-circle';
      }
      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#8A2BE2',
    inactiveTintColor: 'gray',
  },
},{
  initialRouteName: 'ClientStart',
  headerLayoutPreset: 'center'
});
// Root Stack - Stack principal para navegar entre stacks
const RootStack = createSwitchNavigator({
  Log: {screen: LogStack},
  Client:{screen: ClientStack},
  Boss: {screen: BossTav},
},
{
    initialRouteName: 'Log',
    headerLayoutPreset: 'center'
})


export default createAppContainer(RootStack);