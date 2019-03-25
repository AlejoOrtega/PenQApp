import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

//Componentes
import Field from '../components/Field';
import Button from '../components/Button';

//Fire Base
import * as firebase from 'firebase';


//Vista Login, Vista principal de la aplicacion
export default class Login extends React.Component {
    constructor(props){
        super(props);

        this.state={
          correo:'',
          contra:'',
        }

    }

    //Inicia sesion y determina el tipo de usuario.
    _onPressLogIn=()=>{

      firebase.auth().signInWithEmailAndPassword(this.state.correo, this.state.contra)
      .then(()=>
      {
        currentUser = firebase.auth().currentUser;
        firebase.database().ref('Users/'+currentUser.uid+'/GeneralInformation').once('value', (dataSnapshot)=>{
          const credencials = Object.values(dataSnapshot.val());
          if(credencials[2] == 0){
            this.props.navigation.navigate('ClientStart');
          }else{
            this.props.navigation.navigate('BossStart');
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
