import React from 'react';
import { View, Alert, Text , Button, StyleSheet, Image } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import firebase from "firebase"

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class ComentsLoader extends React.Component {
  constructor(props){
      super(props);
  }

  stackServices(){
    var pension = firebase.database().ref('Pensiones/'+this.props.target.ID+'/Comentarios');
    pension.once('value', (dataSnapShot)=>{
      var coments=[];
      dataSnapShot.forEach(element => {
      var coment = element.val()
        if (typeof coment==='object') {
          coments = coments.concat(coment);
        }
      })
      this.props.loadComents(coments)             
      });
    code=[]
    if(this.props.tipo == "cliente"){
        var ver=false;
        
        if(typeof this.props.coments !== 'undefined')
        {
          var chk = true;
            for (let index = 0; index < this.props.coments.length; index++) {
              code.push(
                <Card>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.CircleShapeView}>
                      <Image
                        style={styles.CircleShapeView}
                        source={{ uri: this.props.coments[index].photoUri}}
                      />
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                      <Text style = {{fontWeight: 'bold', fontSize: 20}}>{this.props.coments[index].NombreUser}</Text>
                      <Text style = {{ fontSize: 16}}>{this.props.coments[index].comentario}</Text>
                    </View>
                  </View>

                </Card>
              )
              chk=false;
              if(firebase.auth().currentUser.uid == this.props.coments[index].comentadorPorUser){
                ver= true;
              }
                
            }
            
          }else{
            code.push(
              <Text>Esta pension aun no tiene comentarios!</Text>
            )
          }
          if(chk){
            code.push(
              <View style={{alignItems:'center'}}>
              <Text style = {{ fontSize: 18}}>Esta pension aun no tiene comentarios</Text>
                <Image
                style={{width:80, height:80}}
                source={require('../screens/Image/noHay.png')}/>
              </View>
            )
          }
          if(ver == false){
            code.push(
                <Button
                    title='¿Viviste aquí? ¡Califícalo!'
                    color = '#7b68ee'
                    onPress={this.props.onPressCalificar.bind(this) }/>
            )
        }
        
    }
  return code;
}
    render() {
    return (
      <View style = {{width: '100%'}}>
        {this.stackServices()}
      </View>

    );
  }
}

function mapStateToProps(state){
  const {target, coments}=state;
  return {
    target,
    coments
  };
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch),
    updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
    loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
    loadComents: bindActionCreators(Actions.loadComents,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComentsLoader);

const styles = StyleSheet.create({
 
  CircleShapeView: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
    backgroundColor: 'grey'
  }
 
});