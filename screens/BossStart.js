import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';

// Vista principal para el dueño.
export default class BossStart extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <Text>Here is the Boss</Text>
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