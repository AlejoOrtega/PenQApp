import React, { Component } from 'react';
import { View, Text,StyleSheet, TextInput, Button } from 'react-native';
import CheckBox from 'react-native-check-box';
import firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';



class AddPension extends Component {
    constructor(props) {
      super(props)
      this.state={
        alias:'',
        direction:'',
        specific:'',
        rules:'',
        barrio:'',
        isCheckedComida: false,
        isCheckedInternet: false,
        isCheckedCuarto: false,
        isCheckedLlave: false,
        isCheckedAseo: false,
        isCheckedLavado: false,

      }
    }
    _onPressLocatePension=()=>{
        this.props.navigation.navigate('Locate');
    }
    _onChangeAlias=(text)=>{
        this.setState({alias: text});
    }
    _onChangeDirection=(text)=>{
        this.setState({direction: text});
    }
    _onChangeSpecifications=(text)=>{
        this.setState({specific: text});
    }
    _onChangeRules=(text)=>{
        this.setState({rules: text});
    }
    _onChangeBarrio=(text)=>{
        this.setState({barrio: text});
    }
    _onPressPictures=()=>{
        this.props.navigation.navigate('Camera')
    }

    _onPressSendData=()=>{
        currentUser = firebase.auth().currentUser;
        newItem = firebase.database().ref('Pensiones/');
        pushID = newItem.push().key;
        newItem.child(pushID+'/Pension-Info').set({
            Alias: this.state.alias,
            Direccion: this.state.direction,
            Especific: this.state.specific,
            Reglas: this.state.rules,
            Barrio: this.state.barrio,
            Comida: this.state.isCheckedComida,
            Internet: this.state.isCheckedInternet,
            Llaves: this.state.isCheckedLlave,
            Aseo: this.state.isCheckedAseo,
            Lavado: this.state.isCheckedLavado,
            ID: pushID,
            coordinates: this.props.coordinates,
            bossID: currentUser.uid,
            Rating: 0,
        });
        newItem.child(pushID+'/Comentarios').set({
            Comentario:'Aqui van los comentarios'
        });
        newItem.child(pushID+'/Cuartos').set({
            Cuartos:'Aqui van cuartos'
        });
        var query = firebase.database().ref('Pensiones/');
             query.once("value")
              .then((snapshot)=> {
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


    
    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>Aqui puedes añadir una pension</Text>
                    <Text> Ingresa los datos que hay debajo!</Text>
                </View>
                <View style={styles.center}>
                    <Text>Ponle un nombre a tu casa!</Text>
                        <TextInput
                        style={styles.textInput}
                        onChangeText={this._onChangeAlias}/>
                    <Text>Direccion</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this._onChangeDirection}/>
                    <Text>Barrio</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this._onChangeBarrio}/>
                    <Text>Seleccione los servicios que ofrece</Text>
                    <CheckBox
                        onClick={()=>{
                            this.setState({isCheckedComida: !this.state.isCheckedComida})
                        }}
                        isChecked={this.state.isCheckedComida}
                        leftText={"Comida"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({isCheckedInternet: !this.state.isCheckedInternet})
                        }}
                        isChecked={this.state.isCheckedInternet}
                        leftText={"Internet"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({isCheckedLavado: !this.state.isCheckedLavado})
                        }}
                        isChecked={this.state.isCheckedLavado}
                        leftText={"Lavado"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({isCheckedAseo: !this.state.isCheckedAseo})
                        }}
                        isChecked={this.state.isCheckedAseo}
                        leftText={"Aseo en los cuartos"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({isCheckedLlave: !this.state.isCheckedLlave})
                        }}
                        isChecked={this.state.isCheckedLlave}
                        leftText={"al cliente se le da llaves de la casa"}
                    />
                    <Text>Agregue Observaciones importantes a los servicios que ofrece</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Por ejemplo, En el servicio de la comida, no se ofrece comida los domingos ni festivos'
                        onChangeText={this._onChangeSpecifications}/>
                    <Text>Ahora, agregue reglas generales de la casa que deberia saber el cliente</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Por ejemplo, no se pueden recibir visitas sin autorizacion'
                        onChangeText={this._onChangeRules}/>
                    <Text>Listo!</Text>

                    <Button
                        title='Localiza tu pension!'
                        onPress={this._onPressLocatePension}
                        />
                        <Button
                        title='Agrega fotos!'
                        onPress={this._onPressPictures}
                        /> 
                </View>
                <View style={styles.footer}>
                    <Button
                        title='Confirmar y enviar datos'
                        onPress={this._onPressSendData}
                        />   
                </View>
                    
            </View>
            

        );
    }
}

function mapStateToProps(state){
    const {user, pensiones, coordinates} = state;
    return{
      user,
      pensiones,
      coordinates
    };
  }
  
  function mapDispatchToProps(dispatch){
    return{
      updateData: bindActionCreators(Actions.updateData,dispatch),
      updateDataBoss: bindActionCreators(Actions.updateDataBoss, dispatch),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddPension);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 0.5,
      backgroundColor: 'lightblue',
    },
    center:{
      justifyContent: 'center',
      flex: 3,
      padding: 10,
    },
    footer:{
      justifyContent: 'flex-end',
      flex: 0.5,
    },
    textInput:{
        borderColor: 'black',
        backgroundColor: 'grey',
        height: '5%'
      },
    contentContainer: {
        flex:1,
      }
  });