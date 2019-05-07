import React from 'react';
import { View, Alert, Text, StyleSheet, Image, Button } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'



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
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.CircleShapeView}>
                {/* //<Image
                  //style ={styles.logo}
                  //source={{uri:}}
                ///> */}
              </View>
              <View style={{ flexDirection: 'column', alignItems:'center', margin: 10 }}>
                <Text style={{ alignSelf: 'center', fontSize: 20}}>{pensiones[i].Alias}</Text>
                <Button
                  title='Ver pension'
                  onPress={this.props.Press.bind(this, pensiones[i])}
                  color='#7b68ee'
                  style = {{width: 100, height: 50}}
                />
              </View>
            </View>
            
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
    width: 80,
    height: 80,
    borderRadius: 80/2,
    backgroundColor: 'grey'
  }
 
});
