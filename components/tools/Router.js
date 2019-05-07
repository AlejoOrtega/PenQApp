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
      title : 'Perfil Pension',
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
      title : 'Calificar',
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
      title : 'Calificacion por criterios',
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
      title : 'Busqueda',
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
      title : 'Pensiones',
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
      title : 'Cuartos',
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
      title : 'Inicio',
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
      title: 'Busqueda',
    }),
  },ClientMapa:{
    screen: ClientMapStack,
    navigationOptions: () => ({
      title: 'Map'
    }),
  },ClientStart:{
    screen: ClientStartStack,
    navigationOptions: () => ({
      title: 'Inicio',
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
    inactiveTintColor: '#7b68ee',
  },
},{
  initialRouteName: 'ClientStart',
  headerLayoutPreset: 'center'
});

// Boss Stack - Usuarios que han iniciado sesion y son tipo dueños
const BossStack = createStackNavigator({
  BossStart:{
    screen: BossScreen,
    navigationOptions: () => ({
      title : 'Inicio',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      }
    }),
  },
  AddPension:{
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
      title : 'Localiza tu pension!',
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
      title : 'Pension',
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
  AddCuarto:{
    screen: AddCuarto,
    navigationOptions: () => ({
      title : 'Agregar Cuarto',
      headerTintColor:'white',
      headerTitleStyle:{
        color: 'white'
      },
      headerStyle:{
        backgroundColor: '#7b68ee'
      },
    }),
  },
  CuartosView:{
    screen: CuartosView,
    navigationOptions: () => ({
      title : ' Mis Cuartos',
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
  CheckUsers:{
    screen: CheckUsers,
    navigationOptions: () => ({
      title : 'Verificar Usuarios',
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
  initialRouteName: 'BossStart',
  headerLayoutPreset: 'center'
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