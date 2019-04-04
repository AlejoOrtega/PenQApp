import React from 'react';
import { View, Alert, Text } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'



export default class CuartosList extends React.Component {
  constructor(props){
      super(props);
  }

  cuartosListCreator(){
    let code=[]
    if(this.props.data!=null){
      var cuartos = this.props.data;

      for(var i=0; i< cuartos.length;i=i+1){
        code.push(
          <Card>
            <Text>{cuartos[i].Precio}</Text>
            <Button
            title='Press me!'
            onPress={this.props.Press.bind(this, cuartos[i])}/>
          </Card>
        )
        }
    }
      return(code);
  } 
  
  
    render() {
    return (
      <View>
        {this.cuartosListCreator()}
      </View>

    );
  }
}
