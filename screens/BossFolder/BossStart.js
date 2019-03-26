import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Button, Icon, Fab } from 'native-base';
export default class FABExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    };
  }

  _onPressFab=()=>{
    this.setState({ active: !this.state.active })
  }

  render() {
    return (  
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Hi User</Text>
        </View>
        <View style={styles.center}>

        </View>
        <View style={styles.footer}>
        <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={styles.fab}
              position="bottomRight"
              onPress={this._onPressFab}>
              <Icon name="settings" />
              <Button style={{ backgroundColor: '#DD5144' }}>
                <Icon name="log-out" />
              </Button>
              <Button style={{ backgroundColor: '#34A34F' }}>
                <Icon name="add" />
              </Button>
              <Button style={{ backgroundColor: '#3B5998' }}>
                <Icon name="person" />
              </Button>
            </Fab>
        </View>
      </View>
        
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'purple',
  },
  center:{
    justifyContent: 'center',
    flex: 3,
  },
  footer:{
    alignItems: 'baseline',
    flex: 3,
  },
  fab:{
    backgroundColor: '#5067FF', 
  }
});