import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

//Componentes
import {ButtonGroup} from 'react-native-elements';
import Field from '../components/Field'
import Button from '../components/Button'

//FireBase
import * as firebase from 'firebase';

//Vista de Registro
export default class Register extends React.Component {
  constructor(props){
      super(props);

      this.state={
        nombre:'',
        apellido:'',
        correo:'',
        contra:'',
        rcontra:'',
        selectedIndex: 0,
      }
      this.updateIndex = this.updateIndex.bind(this);
  }

  //Actualiza estado selectedIndex
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  //Envia registro a firebase
  _Registration=()=>{
    
    if(this.state.nombre != '' || this.state.apellido != '' || this.state.correo != '' || this.state.rcontra != ''){
      if(this.state.contra === this.state.rcontra){

        firebase.auth().createUserWithEmailAndPassword(this.state.correo, this.state.contra)
        .then(()=>{
          
          loggedUser = firebase.auth().currentUser;
          userReference = firebase.database().ref('Users/');
          userReference.child(loggedUser.uid+'/Account-Info').set({
            Nombre: this.state.nombre,
            Apellido: this.state.apellido,
            Correo: this.state.correo,
            Contra: this.state.contra,
            Type: this.state.selectedIndex,
            photoUri: "none"
          })
          
          this.props.navigation.navigate('Login')
        })
        .catch((err)=>alert(err));
  
      }else{
        alert('Las contraseña no son iguales! ')
      }
    }else{
      alert('No puede haber campo vacio')
    }
    
  }

  //Actualiza el estado de nombre
  _onChangeNombre=(text)=>{
    this.setState({nombre: text});
  }

  //Actualiza el estado de apellido
  _onChangeApellido=(text)=>{
    this.setState({apellido: text});
  }

  //Actualiza el estado de correo
  _onChangeCorreo=(text)=>{
    this.setState({correo: text});
  }

  //Actualiza el estado de contra
  _onChangePass=(text)=>{
    this.setState({contra: text});
  }
  //Actualiza el estado de rcontra
  _onChangeRpass=(text)=>{
    this.setState({rcontra: text});
  }
    render() {
      const buttons = ['Cliente', 'Dueño']
      const {selectedIndex} = this.state
      return (
          <View style={styles.container}>
              <View style={styles.header}>
                <Text>Registrate como un nuevo usuario!</Text>
              </View>
              <View style={styles.center}>
                <Field placeholder='Nombre' onChange={this._onChangeNombre}/>
                <Field placeholder='Apellido' onChange={this._onChangeApellido}/>
                <Field placeholder='Ingresa tu correo' onChange={this._onChangeCorreo}/>
                <Field placeholder='Ingresa tu contraseña' onChange={this._onChangePass}/>
                <Field placeholder='Contraseña Nuevamente' onChange={this._onChangeRpass}/>
                <ButtonGroup
                      onPress={this.updateIndex}
                      selectedIndex={selectedIndex}
                      buttons={buttons}
                      containerStyle={{height:50, width:200, alignSelf: 'center', marginTop: 10}}
                    />
                
              </View>
              <View style={styles.footer}>
                <Button 
                    title='Registrate!'
                    onPress={this._Registration}/>
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
      header:{
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1.5,
      },
      center:{
        justifyContent: 'center',
        width: '90%',
        flex: 3,
      },
      footer:{
        justifyContent: 'center',
        alignItems: 'baseline',
        flex: 3,
      }
});