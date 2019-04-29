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
			<Text>{this.props.data.Alias}</Text>
			<Text>{this.props.data.Descrip}</Text>
			<Text>{this.props.data.Capacidad}</Text>
			<Text>{this.props.data.Obser}</Text>
			<Text>{this.props.data.Precio}</Text>
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
