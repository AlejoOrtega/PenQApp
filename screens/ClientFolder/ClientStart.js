import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import Map from '../../components/Map'
//Vista principal del cliente
export default class ClientStart extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <Map></Map>
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