import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, TextInput, Button} from 'react-native';
import CheckBox from 'react-native-check-box';
import {isSignedIn,onSignIn} from '../../components/tools/Auth'
import firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class EditPension extends Component {
    constructor(props) {
      super(props)
      this.state={
        alias:this.props.target.Alias,
        aseo:this.props.target.Aseo,
        barrio: this.props.target.Barrio,
        comida: this.props.target.Comida,
        direccion: this.props.target.Direccion,
        espe: this.props.target.Especific,
        internet: this.props.target.Internet,
        lavado: this.props.target.Lavado,
        llave: this.props.target.Llaves,
        rating: this.props.target.Rating,
        reglas: this.props.target.Reglas,
      };
    }

    _changeAlias=(text)=>{
      this.setState({alias: text});
    }
    _changeBarrio=(text)=>{
      this.setState({barrio: text});
    }
    _changeDireccion=(text)=>{
      this.setState({direccion: text});
    }
    _changeEspe=(text)=>{
      this.setState({espe: text});
    }
    _changeReglas=(text)=>{
      this.setState({reglas: text});
    }
    _onPressSendChanges=() =>{
      this.props.target.Alias= this.state.alias;
      this.props.target.Aseo=this.state.aseo;
      this.props.target.Barrio = this.state.barrio;
      this.props.target.Comida = this.state.comida;
      this.props.target.Direccion = this.state.direccion;
      this.props.target.Especific = this.state.espe;
      this.props.target.Internet = this.state.internet;
      this.props.target.Lavado = this.state.lavado;
      this.props.target.Llaves = this.state.llave;
      this.props.target.Rating = this.state.rating;
      this.props.target.Reglas = this.state.reglas;

      firebase.database().ref('Pensiones/'+this.props.target.ID+'/Pension-Info').update({
        Alias: this.state.alias,
        Aseo:this.state.aseo,
        Barrio : this.state.barrio,
        Comida : this.state.comida,
        Direccion : this.state.direccion,
        Especific : this.state.espe,
        Internet : this.state.internet,
        Lavado : this.state.lavado,
        Llaves : this.state.llave,
        Rating : this.state.rating,
        Reglas : this.state.reglas,
      });
      

      this.props.navigation.navigate('PensionView',{render: true});

    }
    render(){
      return(
        <View style={styles.container}>
                <View style={styles.header}>
                  <Text>Modifica los datos de tu pension</Text>
                </View>
                <View style={styles.center}>
                  <Text>Alias</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={this.props.target.Alias}
                    onChangeText={this._changeAlias}
                  ></TextInput>
                  <Text>Barrio</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={this.props.target.Barrio}
                    onChangeText={this._changeApellido}
                  ></TextInput>
                  <Text>Direccion</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={this.props.target.Direccion}
                    onChangeText={this._changeApellido}
                  ></TextInput>
                  <CheckBox
                        onClick={()=>{
                            this.setState({comida: !this.state.comida})
                        }}
                        isChecked={this.state.comida}
                        leftText={"Comida"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({internet: !this.state.internet})
                        }}
                        isChecked={this.state.internet}
                        leftText={"Internet"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({lavado: !this.state.lavado})
                        }}
                        isChecked={this.state.lavado}
                        leftText={"Lavado"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({aseo: !this.state.aseo})
                        }}
                        isChecked={this.state.aseo}
                        leftText={"Aseo en los cuartos"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({llave: !this.state.llave})
                        }}
                        isChecked={this.state.llave}
                        leftText={"al cliente se le da llaves de la casa"}
                    />
                  <Text>Especificaciones de los servicios</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={this.props.target.Especific}
                    onChangeText={this._changeEspe}
                  ></TextInput>
                  <Text>Reglas</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={this.props.target.Reglas}
                    onChangeText={this._changeReglas}
                  ></TextInput>
                </View>
                <View style={styles.footer}>
                  <Button
                  title='Registrar cambios'
                  onPress={this._onPressSendChanges}
                  />
                </View>
        </View>
      );        
    }
}

function mapStateToProps(state){
  const {user,target} = state;
  return{
    user,
    target
  };
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPension);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    borderColor: 'black',
    backgroundColor: 'grey',
  },
  edit:{
    color: 'blue',
    fontSize: 20,
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  center:{
    justifyContent: 'center',
    flex: 4,
  },
  footer:{
    flexDirection: 'row',
    alignItems: 'baseline',
    flex: 0.5,
  }
});