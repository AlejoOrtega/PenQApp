import React from 'react';
import { View, Alert, Text , Button, StyleSheet, Image } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'

export default class ComentLoaderBoss extends React.Component{
    stackComents(){
        code=[]
        console.log(this.props.comentarios)
        if(this.props.comentarios!=null){
            for (let index = 0; index < this.props.comentarios.length; index++) {
                
                code.push(
                    <Card>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.CircleShapeView}>
                      <Image
                        style={styles.CircleShapeView}
                        source={{ uri: this.props.comentarios[index].photoUri}}
                      />
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                      <Text style = {{fontWeight: 'bold', fontSize: 20}}>{this.props.comentarios[index].NombreUser}</Text>
                      <Text style = {{ fontSize: 16}}>{this.props.comentarios[index].comentario}</Text>
                    </View>
                  </View>

                </Card>
                )
            }
        }
        return code;
    }

    render(){
        return(
            <View style = {{width: '100%'}}>
                {this.stackComents()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
 
    CircleShapeView: {
      width: 80,
      height: 80,
      borderRadius: 80/2,
      backgroundColor: 'grey'
    }
   
  });