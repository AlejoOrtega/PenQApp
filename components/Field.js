import React from 'react';
import { StyleSheet,TextInput } from 'react-native';

// Componente TextInput recibe:
// #1 - placeHolder, texto que se mostrara en el componente
// #2 - onChange, devuelve el texto que se esta modificando
export default class Field extends React.Component {
  constructor(props){
      super(props);
  }
    render() {
    return (
        <TextInput
            style={styles.textInput}
            placeholder={this.props.placeholder}
            onChangeText={this.props.onChange}
            secureTextEntry={this.props.pass}
            autoCapitalize={this.props.caps}
        />

    );
  }
}

const styles = StyleSheet.create({
  textInput:{
    height: 40, 
    borderColor: 'black', 
    borderWidth: 1,
    backgroundColor: '#f6f6f6', 
    borderRadius:10,
    fontFamily:'sans-serif-medium',
    textAlign: 'center'
  }
});