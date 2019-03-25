import React from 'react';
import { StyleSheet, Button } from 'react-native';


// Componente Boton recibe:
// #1 - onPress, para lo cual sera usado el boton
// #2 - Title, el texto que se le pondra al boton
export default class Login extends React.Component {
  constructor(props){
      super(props);
  }
    render() {
    return (
        <Button
            onPress={this.props.onPress}
            title={this.props.title}
            color="#841584"
        />

    );
  }
}

const styles = StyleSheet.create({
  button:{
    height: 40, 
    borderColor: 'black', 
    borderWidth: 1
  }
});