import React from 'react';
import { View, Alert, Text, StyleSheet, Button } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'



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
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.CircleShapeView}>
                  {/* //<Image
                  //style ={styles.logo}
                  //source={{uri:}}
                ///> */}
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                  <View style={styles.cardInfo}>
                    <Text style={{ fontSize: 18 }}>{cuartos[i].Alias}</Text>
                    <Text style={{ fontSize: 18 }}>${cuartos[i].Precio}</Text>
                  </View>
                  <Button
                    title='Ver Cuarto'
                    color='#7b68ee'
                    onPress={this.props.Press.bind(this, cuartos[i])} />
                  <Button
                    title='Ver pension de este cuarto'
                    color='#7b68ee'
                    onPress={this.props.ViewPension.bind(this, pension)} />
                </View>
              </View>

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
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.CircleShapeView}>
                  {/* //<Image
                  //style ={styles.logo}
                  //source={{uri:}}
                ///> */}
                </View>
                <View style={{ flexDirection: 'column', margin: 10 }}>
                  <View style={styles.cardInfo}>
                    <Text style={{ fontSize: 14 }}>{cuartos[i].Alias}    </Text>
                    <Text style={{ fontSize: 14 }}>${cuartos[i].Precio}</Text>
                  </View>
                  <Button
                    title='Ver cuarto'
                    color='#7b68ee'
                    onPress={this.props.Press.bind(this, cuartos[i])} />
                </View>
              </View>

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
  CircleShapeView: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
    backgroundColor: 'grey'
  }
 });
