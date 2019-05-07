import React from 'react';
import { View, Alert, Text, Button } from 'react-native';
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
        if(this.props.coments!=null)
        {
          var ver=false;
            for (let index = 0; index < this.props.coments.length; index++) {
                code.push(
                    <View>
                    <Text>{this.props.coments[index].NombreUser}</Text>
                    <Text>{this.props.coments[index].comentario}</Text>
                    </View>
                )
                if(firebase.auth().currentUser.uid == this.props.coments[index].comentadorPorUser){
                  ver= true;
                }
            }
            if(ver == false){
              code.push(
                  <Button
                    title='Viviste aqui? Calificalo!'
                    style = {{width: 100, height: 50, borderRadius: 50, alignSelf: 'center'}}
                    color = '#afeeee'  
                    onPress={this.props.onPressCalificar.bind(this) }/>
              )
          }
        }
    }
  return code;
}
    render() {
    return (
      <View>
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
