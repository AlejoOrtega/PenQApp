import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Picker, ScrollView} from 'react-native';

import firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';




const barrios=["Cualquier Barrio","La Playa","Villa Santos","Urb La Playa", "Villa Campestre", "El poblado", "Altamira", "San Vicente",
"Altos del Limon", "Altos de Riomar", "Santa Monica", "Riomar", "Andalucia", "Las Flores", "San Salvador", "Siape", "Las Tres Avemarias",
"Villa del Este", "El Castillo", "Solaire", "El limoncito", "Altos del Prado", "La Castellana", "Villa Carolina", "El Golf", "San Marino",
"Adela de Char", "Alameda del Rio", "Ciudad Jardin", "La Campiña", "El Tabor", "Miramar", "Granadillo", "Los Alpes", "Nuevo Horizonte", "El Porvenir",
"El Country","Los Nogales", "La Concepción", "San Francisco", "Santa Ana", "América", "Colombia", "El Prado", "Bellavista", "Modelo",
"Montecristo", "La Felicidad"]

class EngineSearch extends Component {
    constructor(props) {
      super(props)
      this.state = {
        opcion:'pension',
        internet: false,
        aseo: false,
        comida: false,
        lavado: false,
        llaves: false,
        Barrio: 'Cualquier Barrio',
        Rating: 'Cualquier Valoracion',
        Precio: '0',
      }
    }
    

  
    _changeOpcion=(option)=>{
      this.setState({opcion: option})
    }

    _loadBarrios(){
      code=[];
      for(var i=0; i<barrios.length;i++){
        code.push(
          <Picker.Item label={barrios[i]} value={barrios[i]}/>
        )
      }
      return code;
    }
    _onPressInternet=()=>{
      this.setState({internet: !this.state.internet})

    }
    _onPressAseo=()=>{
      this.setState({aseo: !this.state.aseo})
    }
    _onPressComida=()=>{
      this.setState({comida: !this.state.comida})
    }
    _onPressLavado=()=>{
      this.setState({lavado: !this.state.lavado})
    }
    _onPressLlaves=()=>{
      this.setState({llaves: !this.state.llaves})
    }
    _onPressSearch=()=>{
      if(this.state.opcion =='pension'){
        var pension=[];
        for(var i=0; i<this.props.pensiones.length;i++){
          var checker= true;
          var list=[0,0,0,0,0];
          var pen=[0,0,0,0,0];
          if(this.state.Barrio=='Cualquier Barrio' || this.state.Barrio==this.props.pensiones[i].Barrio){
            if(this.state.Rating=='Cualquier Valoracion' || parseInt(this.state.Rating,10)<=parseInt(this.props.pensiones[i].Rating,10)){
              if(this.state.internet){list[0]=1;}
              if(this.state.aseo){list[1]=1;}
              if(this.state.comida){list[2]=1;}
              if(this.state.lavado){list[3]=1;}
              if(this.state.llaves){list[4]=1;}
              if(this.props.pensiones[i].Internet){ pen[0]=1;}
              if(this.props.pensiones[i].Aseo){ pen[1]=1;}
              if(this.props.pensiones[i].Comida){ pen[2]=1;}
              if(this.props.pensiones[i].Lavado){ pen[3]=1;}
              if(this.props.pensiones[i].Llaves){ pen[4]=1;}
              
              for (let index = 0; index < list.length; index++) {
                if(list[index]==1){
                  if(list[index] != pen[index]){
                    checker=false;
                  }
                }
              }
              if(checker){
                pension=pension.concat(this.props.pensiones[i])
              }
            }
          }
        }
        this.props.engineResults(pension);
        this.props.navigation.navigate('resultPen');
      }else if(this.state.opcion =='cuarto'){

        var query = firebase.database().ref('Pensiones/');
        query.once('value',(snap)=>{
          var final=[];
          var list=[0,0,0,0,0];
          var pen=[0,0,0,0,0];

          if(this.state.internet){list[0]=1;}
          if(this.state.aseo){list[1]=1;}
          if(this.state.comida){list[2]=1;}
          if(this.state.lavado){list[3]=1;}
          if(this.state.llaves){list[4]=1;}
          
          snap.forEach((child)=>{
          
          var checker= true;
          pension = Object.values(child.val());
          penInfo = Object.values(pension[2]);
          
              if(penInfo.Internet){ pen[0]=1;}
              if(penInfo.Aseo){ pen[1]=1;}
              if(penInfo.Comida){ pen[2]=1;}
              if(penInfo.Lavado){ pen[3]=1;}
              if(penInfo.Llaves){ pen[4]=1;}
              for (let index = 0; index < list.length; index++) {
                if(list[index]==1){
                  if(list[index] != pen[index]){
                    checker=false;
                  }
                }
              }
              if(checker){
                var result=[]
                var cuartos= Object.values(pension[1]);
                cuartos.forEach((room)=>{
                  roomD= room;
                  if(typeof roomD ==='object'){
                    if(parseInt(roomD.Precio)<=parseInt(this.state.Precio) || this.state.Precio == "Cualquier Precio"){
                      result = result.concat(roomD);
                    }
                  }
                })
                final = final.concat(result)
              }
          })
          this.props.engineResults(final);
          this.props.navigation.navigate('resultCua');
          
        });
      }
    }

    

  render() {

    if(this.state.opcion =='pension'){
      return(
        <ScrollView contentContainerStyle = {styles.container}>
          <View style = {styles.pickers}>
            <Text style={{ fontSize: 18 }}>Seleccione que opcion desea buscar</Text>
            <Picker
              selectedValue={this.state.opcion}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ opcion: itemValue })
              }>
              <Picker.Item label="Pension" value="pension" />
              <Picker.Item label="Cuarto" value="cuarto" />
            </Picker>

            <Text style={{ fontSize: 18 }}>Te gustaria algun barrio en especial?</Text>
            <Picker
              selectedValue={this.state.Barrio}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ Barrio: itemValue })
              }>
              {this._loadBarrios()}
            </Picker>

            <Text style={{ fontSize: 18 }}>Seleccione la valoracion minima de las pensiones</Text>
            <Picker
              selectedValue={this.state.Rating}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ Rating: itemValue })
              }>
              <Picker.Item label="Cualquier Valoracion" value="0" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="1" value="1" />
            </Picker>

          </View>

          <View style = {styles.buttons}>
            <Text style={{ fontSize: 18 }}>Que servicios te gustaria tener encuenta?</Text>
            <Button
              title='Internet'
              color={this.state.internet == true ? '#01ad1b' : '#7c0a00'}
              onPress={this._onPressInternet}
            />
            <Button
              title='Aseo'
              color={this.state.aseo == true ? '#01ad1b' : '#7c0a00'}
              onPress={this._onPressAseo}
            />
            <Button
              title='Comida'
              color={this.state.comida == true ? '#01ad1b' : '#7c0a00'}
              onPress={this._onPressComida}
            />
            <Button
              title='Lavado'
              color={this.state.lavado == true ? '#01ad1b' : '#7c0a00'}
              onPress={this._onPressLavado}
            />
            <Button
              title='Llaves de la casa'
              color={this.state.llaves == true ? '#01ad1b' : '#7c0a00'}
              onPress={this._onPressLlaves}
            />
            <View style={styles.buttom}>
              <Button
                title="Buscar"
                style={styles.buttom}
                color='#7b68ee'
                onPress={this._onPressSearch}
              />
            </View>

          </View>
          
        </ScrollView>
      );
      
    }else if(this.state.opcion == 'cuarto'){
      return(
        <ScrollView contentContainerStyle = {styles.container}>
          <View style = {styles.pickers}>
            <Text style={{ fontSize: 18 }}>Seleccione que opcion desea buscar</Text>
            <Picker
              selectedValue={this.state.opcion}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ opcion: itemValue })
              }>
              <Picker.Item label="Pension" value="pension" />
              <Picker.Item label="Cuarto" value="cuarto" />
            </Picker>

            <Text style={{ fontSize: 18 }}>Seleccione hasta que precios desea manejar</Text>
            <Picker
              selectedValue={this.state.Precio}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ Precio: itemValue })
              }>
              <Picker.Item label="Cualquier Precio" value="9999999" />
              <Picker.Item label="$600.000 COP" value="600000" />
              <Picker.Item label="$800.000 COP" value="800000" />
              <Picker.Item label="$1.000.000 COP" value="1000000" />
              <Picker.Item label="$1.200.000 COP" value="1200000" />
              <Picker.Item label="$1.400.000 COP" value="1400000" />
            </Picker>

          </View>
          

          <View style = {styles.buttons}>
            <Text style={{ fontSize: 18 }}>Que servicios te gustaria tener encuenta?</Text>
            <Button
              title='Internet'
              color={this.state.internet == true ? '#01ad1b' : '#7c0a00'}
              onPress={this._onPressInternet}
            />
            <Button
              title='Aseo'
              color={this.state.aseo == true ? '#01ad1b' : '#7c0a00'}
              onPress={this._onPressAseo}
            />
            <Button
              title='Comida'
              color={this.state.comida == true ? '#01ad1b' : '#7c0a00'}
              onPress={this._onPressComida}
            />
            <Button
              title='Lavado'
              color={this.state.lavado == true ? '#01ad1b' : '#7c0a00'}
              onPress={this._onPressLavado}
            />
            <Button
              title='Llaves de la casa'
              color={this.state.llaves == true ? '#01ad1b' : '#7c0a00'}
              onPress={this._onPressLlaves}
            />
            <View style={styles.buttom}>
              <Button
                title="Buscar"
                color='#7b68ee'
                onPress={this._onPressSearch}
              />
            </View>
            
          </View>
          

        </ScrollView>
        );
      
    }
  }
}
function mapStateToProps(state){
  const {pensiones} = state;
  return{
    pensiones
  };
}

function mapDispatchToProps(dispatch){
  return{
    engineResults: bindActionCreators(Actions.engineResults,dispatch),
    updateData: bindActionCreators(Actions.updateData,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EngineSearch);

const styles = StyleSheet.create({
  container: {
    justifyContent:'center', alignItems: 'center'
  },
  buttons:{
    width: '90%',
    height: 400,
    flex: 4,
    justifyContent: 'space-evenly',
  },
  botonesServicios:{
    borderRadius: 20,
    borderWidth: 1,
  },
  pickers: { 
    width: '90%',
    height: 300,
    flex: 4,
    justifyContent: 'space-evenly',
  },
  scroll:{
    justifyContent: 'space-evenly'
  },
  textInput:{
    borderColor: 'black',
    backgroundColor: 'grey',
  },
  text:{
      marginTop: 20,
  },
  edit:{
    color: 'blue',
    fontSize: 20,
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
  DropStyle:{
    marginTop: 20,
    flex: 3
  },
  footer:{
    flexDirection: 'row',
    alignItems: 'baseline',
    flex: 3,
  },
  buttom:{
    height:100,
    justifyContent: 'center',
    width: '100%'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end', 
  },
});