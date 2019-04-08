import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class EngineSearch extends Component {
    constructor(props) {
      super(props)
      this.state = {
        Barrio: 'Recreo',
        Servicio: 'Aseo',
        Rating: '0',
        Precio: '0',

      }
    }
    
  render() {
    let Barrios = [{
      value: 'Recreo',
    }, {
      value: 'Delicias',
    }, {
      value: 'Nogales',
    }];

    let Precios = [{
      value: '500.000-1.000.000',
    }, {
      value: '1.000.000-1.500.000',
    }, {
      value: '1.500.000-2.000.000',
    }, {
      value: 'Mas de 2.000.000',
    }];

    let Servicios = [{
      value: 'Aseo',
    }, {
      value: 'Alimentacion',
    }];

    let Ratings = [{
      value: '0-1',
    }, {
      value: '1-2',
    }, {
      value: '2-3',
    }, {
      value: '3-4',
    }, {
      value: '4-5',
    }];
    return (
      <View>
        <View style={styles.container}>
          <Dropdown
            value={this.Barrio}
            label='Seleccione un barrio'
            data={Barrios}
          />
        </View>
        <View style={styles.container}>
          <Dropdown
            value={this.Precio}
            label='Seleccione un rango de precios'
            data={Precios}
          />
        </View>
        <View style={styles.container}>
          <Dropdown
            value={this.Rating}
            label='Seleccione un rango de puntajes'
            data={Ratings}
          />
        </View>
        <View style={styles.container}>
          <Dropdown
            value={this.Servicio}
            label='Seleccione servicios deseados'
            data={Servicios}
          />
        </View>
        <Button
          title="Buscar"
          style={styles.bottom}
        />
      </View >
    );
  }
}

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 4,
      marginTop: 30,
      paddingHorizontal: 8,
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
    bottom: {
      flex: 1,
      justifyContent: 'flex-end'
    }
  });