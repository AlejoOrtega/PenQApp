import React from 'react';
import { View, Alert, Text } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'



export default class CardList extends React.Component {
  constructor(props){
      super(props);
  }

  cardCreator(){
    let code=[]
    if(this.props.data!=null){
      var pensiones = Object.values(this.props.data);
      console.log((this.props.data))
      for(var i=0; i< this.props.data.length;i=i+1){
        code.push(
          <Card>
            <Text>{pensiones[i].Alias}</Text>
            <Button
            title='Press me!'
            onPress={this.props.Press.bind(this, pensiones[i])}/>
          </Card>
        )
        }
      }
      return(code);
    }
    
  
  
    render() {
    return (
      <View>
        {this.cardCreator()}
      </View>

    );
  }
}
