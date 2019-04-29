import React from 'react';
import { View, Alert, Text, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'



export default class CuartosList extends React.Component {
  constructor(props){
      super(props);
  }

  cuartosListCreator(){
    let code=[]
    if(this.props.pension!=null){
      if(this.props.data!=null){
        var cuartos = this.props.data;
        var pension;
        for(var i=0; i< cuartos.length;i=i+1){
          for (let index = 0; index < this.props.pension.length; index++) {
            
            if(this.props.pension[index].ID == cuartos[i].PenID){
              pension = this.props.pension[index];
              break;
            }
          }
          
          code.push(
            <Card>
              <View style={styles.cardInfo}>
                <Text>{cuartos[i].Alias}</Text>
                <Text>{cuartos[i].Precio}</Text>
              </View>
              
              <Button
              title='Press me!'
              onPress={this.props.Press.bind(this, cuartos[i])}/>
              <Button
              title='Ver pension de este cuarto'
              onPress={this.props.ViewPension.bind(this, pension)}/>
            </Card>
          )
          }
      }
        return(code);
    }else{
      if(this.props.data!=null){
        var cuartos = this.props.data;
  
        for(var i=0; i< cuartos.length;i=i+1){
          code.push(
            <Card>
              <View style={styles.cardInfo}>
                <Text>{cuartos[i].Alias}</Text>
                <Text>{cuartos[i].Precio}</Text>
              </View>
              
              <Button
              title='Press me!'
              onPress={this.props.Press.bind(this, cuartos[i])}/>
            </Card>
          )
          }
      }
        return(code);
    }
    
  } 
  
  
    render() {
    return (
      <View>
        {this.cuartosListCreator()}
      </View>

    );
  }
}
const styles = StyleSheet.create({
	cardInfo: {
    flexDirection: 'row',
	  justifyContent: 'space-between',
	},
 });
