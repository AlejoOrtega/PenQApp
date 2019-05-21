import React from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';

//Componentes
import {ButtonGroup} from 'react-native-elements';
import Field from '../components/Field';
import Load from '../components/Load'

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
        loading:false
      }
      this.updateIndex = this.updateIndex.bind(this);
  }

  //Actualiza estado selectedIndex
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  


  //Envia registro a firebase
  sendData=()=>{
    
    if(this.state.nombre != '' || this.state.apellido != '' || this.state.correo != '' || this.state.rcontra != ''|| this.state.celular != ''){
      if(this.state.contra === this.state.rcontra){
        this.setState({loading:true})
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
            photoUri: "https://firebasestorage.googleapis.com/v0/b/penq2000.appspot.com/o/utils%2FnoPhoto.png?alt=media&token=f4a445df-ad41-4ba5-a2db-bebdfcdcc91e"
          })
          this.setState({loading:false})
          this.props.navigation.navigate('Login')
        })
        .catch((err)=>alert(err));
  
      }else{
        alert('¡Las contraseñas no son iguales! ')
      }
    }else{
      alert('No puede haber campo vacío')
    }
    
  }

  termsCondition=()=>{
    Alert.alert(
      'Cuidado!',
      'Al registrarte como usuario de esta aplicación, aceptas que los datos brindados son verdaderos y permites el uso de ello dentro de la aplicación. PenQApp no se hace responsable por la información suministrada.',
      [
        {
          text: 'No',
          onPress: () => console.log('Operation Aborted'),
          style: 'cancel',
        },
        {
          text: 'Si', 
          onPress:this.sendData
        },
      ],
      {cancelable: false},
    );
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
        if(this.state.loading){
          return(
            <View style={styles.loading}>
                  <Load/>
                  <Text style={{fontSize: 18, fontWeight:'bold'}}>Estamos registrando tu informacion</Text>
              </View>
          );
        }else{
          
        return (
          <View style={styles.container}>
          <View style={styles.header}>
            <Text>¡Regístrate como un nuevo usuario!</Text>
          </View>
          <View style={styles.center}>

              <Field placeholder='Nombre' onChange={this._onChangeNombre}/>
              <Field placeholder='Apellido' onChange={this._onChangeApellido}/>
              <Field placeholder='Celular' onChange={this._onChangeCell}/>
              
              <Field placeholder='Ingresa tu correo' onChange={this._onChangeCorreo} caps={'none'}/>
              <Field placeholder='Ingresa tu contraseña' onChange={this._onChangePass} pass={true} caps={'none'}/>
              <Field placeholder='Contraseña Nuevamente' onChange={this._onChangeRpass} pass={true} caps={'none'}/>

            <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={{height:'20%', width:'70%', alignSelf: 'center', marginTop: 10}}
                />
            
          </View>
          <View style={styles.footer}>
            <Button 
                title='¡Regístrate!'
                style={styles.pressButton}
                onPress={this.termsCondition}
                color='#7b68ee'/>
          </View>

          
      </View>
        );
    }
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
    },
    loading:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
});