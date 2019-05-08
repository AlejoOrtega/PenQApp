import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

//Componentes
import {ButtonGroup} from 'react-native-elements';
import Field from '../components/Field'

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
        celular:'',
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
    
    if(this.state.nombre != '' || this.state.apellido != '' || this.state.correo != '' || this.state.rcontra != ''|| this.state.celular != ''){
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
            Celular: this.state.celular,
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
  //Actualiza el estado de rcontra
  _onChangeCell=(text)=>{
    this.setState({celular: text});
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
            <Field placeholder='Celular' onChange={this._onChangeCell}/>
            
            <Field placeholder='Ingresa tu correo' onChange={this._onChangeCorreo}/>
            <Field placeholder='Ingresa tu contraseña' onChange={this._onChangePass} pass={true}/>
            <Field placeholder='Contraseña Nuevamente' onChange={this._onChangeRpass} pass={true}/>

          <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height:'20%', width:'70%', alignSelf: 'center', marginTop: 10}}
              />
          
        </View>
        <View style={styles.footer}>
          <Button 
              title='Registrate!'
              style={styles.pressButton}
              onPress={this._Registration}
              color='#7b68ee'/>
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
    pressButton:{
      width: '90%'
    }, 
    header:{
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    center:{
      justifyContent:'space-evenly',
      width: '90%',
      flex: 8,
    },
    footer:{
      justifyContent: 'center',
      flex: 3,
      width:'60%',
    }
});