import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';


//Vista principal del cliente
export default class ClientStart extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Hi! Iam a Client</Text>
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
});