import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

//Componentes
import Field from '../components/Field';
import Button from '../components/Button';

//Fire Base
import * as firebase from 'firebase';

import {onSignIn, isSignedIn, onSignOut} from '../components/tools/Auth';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';




//Vista Login, Vista principal de la aplicacion
class LogIn extends React.Component {
    constructor(props){
        super(props);

        this.state={
          correo:'',
          contra:'',
        }
    }

    componentWillMount(){
      var user = {correo: '', contra: '', type: '', nombre: '', apellido: ''};
      this.props.updateData(user);
    }

    componentDidMount(){
      // onSignOut('Log');

      isSignedIn('Log').then((value)=>{
        this.props.updateData(value);
        if(value != 'empty'){
          firebase.auth().signInWithEmailAndPassword(value.correo, value.contra)
          .then(()=>{
            currentUser=firebase.auth().currentUser.uid;
            
            if (value.type == 0) {
              var query = firebase.database().ref('Pensiones/');
              query.once("value")
                .then((snapshot) => {
                  currentUser = firebase.auth().currentUser;
                  var Pensiones = [];
                  var find = [];
                  snapshot.forEach((childSnapshot) => {
                    find = find.concat(childSnapshot.val());
                  });
                  for (var i = 0; i < find.length; i = i + 1) {
                    var Pension = Object.values(find[i]);
                    //var PensionInfo = Object.values(Pension[2]);
                    //if (PensionInfo[12] == currentUser.uid) {
                      Pensiones = Pensiones.concat(Pension[2]);
                    //}
                  }               
                  this.props.updateDataBoss(Pensiones);
                  this.props.navigation.navigate('ClientStart');
                });
            }else if(value.type ==1){
              var query = firebase.database().ref('Pensiones/');
              query.once("value")
               .then((snapshot)=> {
                 currentUser = firebase.auth().currentUser;
                 var Pensiones=[];
                 var find=[];
                 snapshot.forEach((childSnapshot)=> {       
                     find = find.concat(childSnapshot.val());
                 });
                 for(var i=0; i<find.length;i=i+1){
                   var Pension=Object.values(find[i]);
                   var PensionInfo = Object.values(Pension[2]);
                   if(PensionInfo[12]==currentUser.uid){
                       Pensiones=Pensiones.concat(Pension[2]);
                   }
                 }
               this.props.updateDataBoss(Pensiones);
               this.props.navigation.navigate('BossStart');
             });
             
            }
          }).catch((err)=>alert(err));
        }
      });
    }



    //Inicia sesion y determina el tipo de usuario.
    _onPressLogIn=()=>{

      firebase.auth().signInWithEmailAndPassword(this.state.correo, this.state.contra)
      .then(()=>
      {
        currentUser = firebase.auth().currentUser;
        firebase.database().ref('Users/'+currentUser.uid+'/Account-Info').once('value', (dataSnapshot)=>{
          const credencials = Object.values(dataSnapshot.val());
          var CredeStorage ={correo: credencials[2], contra: credencials[1], type: credencials[4], nombre: credencials[3], apellido: credencials[0]}
          this.props.updateData(CredeStorage);
          onSignIn('Log',CredeStorage).then().catch((err)=>alert(err));

          if(credencials[4] == 0){
            this.props.navigation.navigate('ClientStart');
          }else{
            var query = firebase.database().ref('Pensiones/');
              query.once("value")
               .then((snapshot)=> {
                 currentUser = firebase.auth().currentUser;
                 var Pensiones=[];
                 var find=[];
                  snapshot.forEach((childSnapshot)=> {       
                    find = find.concat(childSnapshot.val());
                    });
                  for(var i=0; i<find.length;i=i+1){
                    var Pension=Object.values(find[i]);
                    var PensionInfo = Object.values(Pension[2]);
                    if(PensionInfo[12]==currentUser.uid){
                        Pensiones=Pensiones.concat(Pension[2]);
                    }
                  }
               this.props.updateDataBoss(Pensiones);
               this.props.navigation.navigate('BossStart');
             });
          }
          
        })
      })
      .catch((err)=>alert(err));


    }

    //Redirige a la vista de registro
    _onPressRegister=()=>{

      this.props.navigation.navigate('Register')

    };

    //Actualiza el estado de correo
    _onChangeCorreo=(text)=>{

      this.setState({correo: text});

    }

    //Actualiza el estado de contra
    _onChangePass=(text)=>{

      this.setState({contra: text});

    }



    render() {
      return (
          <View style={styles.container}>

              <View style={styles.header}>
                {/* Aqui deberia ir el logo */}
                <Image
                  style ={styles.logo}
                  source={require('./Image/NotLogo.png')}
                /> 

              </View>

              <View style={styles.center}>

                  <Field placeholder='Correo' onChange={this._onChangeCorreo}/>
                  <Field placeholder='Contraseña' onChange={this._onChangePass}/>
                  <Button 
                    title='Log In'
                    onPress={this._onPressLogIn}
                  />

              </View>

              <View style={styles.footer}>

                  <Text
                    onPress={this._onPressRegister}
                    >No tienes cuenta? Registrate!
                  </Text>

              </View>

          </View>
      );
    }
}

function mapStateToProps(state){
  return {};
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch),
    updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 80,
    height: 80,
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  center:{
    justifyContent: 'center',
    flex: 3,
  },
  footer:{
    justifyContent: 'center',
    alignItems: 'baseline',
    flex: 3,
  }
});
