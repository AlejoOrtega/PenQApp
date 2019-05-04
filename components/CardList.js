import React from 'react';
import { View, Alert, Text, StyleSheet, Image } from 'react-native';
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
            <View style={styles.CircleShapeView}>
               {/* //<Image
                  //style ={styles.logo}
                  //source={{uri:}}
                ///> */}
            </View>
            <Text>{pensiones[i].Alias}</Text>
            <Button
            title='Ver Pension'
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
const styles = StyleSheet.create({
 
  CircleShapeView: {
    width: 30,
    height: 30,
    borderRadius: 30/2,
  }
 
});
