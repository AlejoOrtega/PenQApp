import React from 'react';
import { View, Alert, Text } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'



export default class DetallesCuarto extends React.Component {
  constructor(props){
      super(props);
  }

  loadDetails(){
    let code=[]
    console.log(this.props.data)
		code.push(
			<View>
        <Text style = {{fontSize: 29.6}}><Text style={{ fontWeight: 'bold' }}>Precio: </Text> {this.props.data.Precio}</Text>
			  <Text>{this.props.data.Alias}</Text>
			  <Text style = {{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Descripcion: </Text> {this.props.data.Descrip}</Text>
			  <Text style = {{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Capacidad: </Text>{this.props.data.Capacidad}</Text>
        <Text style = {{fontSize: 18}}><Text style={{ fontWeight: 'bold' }}>Observaciones: </Text> {this.props.data.Obser}</Text>
			</View>
		)
      return(code);
  } 
  
    render() {
      return (
        <View>
          {this.loadDetails()}
        </View>
      );
  }
}
