import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';

export default class EngineSearch extends Component {
    constructor(props) {
      super(props)
      this.state = {
        DropdownValue : ''
      }
    }
    
  render() {
    var data = [["Alo", "5k", "voy", "HP"]];
    return (
      <View style={styles.container}>
        <Text>Barrio</Text>
        <DropdownMenu
          style={{ flex: 1 }}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          // arrowImg={}      
          // checkImage={}   
          // optionTextStyle={{color: '#333333'}}
          // titleStyle={{color: '#333333'}} 
          // maxHeight={300} 
          handler={(selection, row) => this.setState({ DropdownValue: data[selection][row] })}
          data={data}
        >
          <View style={{ flex: 1 }}>
            <Text>
              {this.state.DropdownValue} is the best language in the world
            </Text>
          </View>
        </DropdownMenu>
      </View >
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
    textInput:{
      borderColor: 'black',
      backgroundColor: 'grey',
    },
    text:{
        borderColor: 'black',
        backgroundColor: 'grey',
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
    footer:{
      flexDirection: 'row',
      alignItems: 'baseline',
      flex: 3,
    }
  });