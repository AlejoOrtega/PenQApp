import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  InteractionManager
} from 'react-native'
import MapView from 'react-native-maps';

export default class Map extends Component{
  constructor(props){
		super(props);
    
		this.state={
      region: {
        latitude:10.9878,
        longitude:-74.7889,
        latitudeDelta:0.1,
        longitudeDelta:0.1
      },
      x:{
        latitude:11.004582,
        longitude:-74.822574
      }
		}
  }

    render(){
      return(
        <MapView style = {styles.map} 
        region={{
          latitude:10.9878,
          longitude:-74.7889,
          latitudeDelta:0.1,
          longitudeDelta:0.1
        }}> 
        </MapView>
      );
  
    }
  }
  
  const styles = StyleSheet.create({
    inputText:{
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop:10,
      bottom:20,
      color: 'black'
    },
    map:{
        position: 'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0
    }
  });