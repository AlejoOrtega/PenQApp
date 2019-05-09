import React from 'react';
import { View, Alert, Text, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


export default class Services extends React.Component {
  constructor(props){
      super(props);
  }

  stackServices(){
    code=[]
    if(this.props.data.Comida){
      code.push(
          <View style={{alignItems:'center'}}>
            <Image
            style={{width:50, height:50}}
            source={require('../screens/Image/dieta.png')}/>
            <Text>Comida</Text>
          </View> 
      )
    }
    if(this.props.data.Aseo){
      code.push(
      <View style={{alignItems:'center'}}>
        <Image
        style={{width:50, height:50}}
        source={require('../screens/Image/escoba.png')}/>
        <Text>Aseo</Text>
      </View> 
      )
    }
    if(this.props.data.Internet){
      code.push(
      <View style={{alignItems:'center'}}>
        <Image
        style={{width:50, height:50}}
        source={require('../screens/Image/wifi.png')}/>
        <Text>Internet</Text>
      </View>
      )
    }
    if(this.props.data.Llaves){
      code.push(
      <View style={{alignItems:'center'}}>
        <Image
        style={{width:50, height:50}}
        source={require('../screens/Image/llaves.png')}/>
        <Text>Llaves de la casa</Text>
      </View>
      )
    }
    if(this.props.data.Lavado){
      code.push(
        <View style={{alignItems:'center'}}>
        <Image
        style={{width:50, height:50}}
        source={require('../screens/Image/limpieza.png')}/>
        <Text>Lavado</Text>
      </View>
      )
    }
    return code;
  }
    render() {
    return (
      <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-evenly'}}>
        {this.stackServices()}
      </View>

    );
  }
}
