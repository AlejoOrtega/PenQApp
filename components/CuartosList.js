import React from 'react';
import { View, Alert, Text, StyleSheet, Image, Button } from 'react-native';
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
          console.log(cuartos[i].Url1)
          code.push(
            <Card>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.CircleShapeView}>
                  <Image
                    style={styles.CircleShapeView}
                    source={{ uri: cuartos[i].Url1 }} />
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10, justifyContent:'center' }}>
                  <View style={styles.cardInfo}>
                    <Text style={{ fontSize: 18 }}>{cuartos[i].Alias}    </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${cuartos[i].Precio}</Text>
                  </View>
                  
                </View>
              </View>
              <View style={{ flexDirection: 'row', height: 50, width:'80%', alignItems:'center', justifyContent:'space-evenly', marginLeft:'20%' }}>
                    <Button
                      title='Ver Cuarto'
                      color='#47449a'
                      onPress={this.props.Press.bind(this, cuartos[i])} />
                    <Button
                      title='Ver pension'
                      color='#7b68ee'
                      onPress={this.props.ViewPension.bind(this, pension)} />

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
                  <Image
                    style={styles.CircleShapeView}
                    source={{ uri: cuartos[i].Url1 }} />
                </View>
                <View style={{ flexDirection: 'column', margin: 10 }}>
                  <View style={styles.cardInfo}>
                    <Text style={{ fontSize: 18 }}>{cuartos[i].Alias}    </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${cuartos[i].Precio}</Text>
                  </View>
                  <View style={{ height: 50, width: '80%' }}>
                    <Button
                      title='Ver cuarto'
                      color='#7b68ee'
                      onPress={this.props.Press.bind(this, cuartos[i])} />
                  </View>
                  
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
      <View style = {{width: '100%'}}>
        {this.cuartosListCreator()}
      </View>

    );
  }
}
const styles = StyleSheet.create({
	cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  CircleShapeView: {
    width: 90,
    height: 90,
    borderRadius: 90/2,
    backgroundColor: 'grey'
  }
 });
