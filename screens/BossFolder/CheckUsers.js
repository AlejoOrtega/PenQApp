import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native'

import firebase from 'firebase'

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class CheckUser extends React.Component{
    _onPressConfirmComent=(coment)=>{
        firebase.database().ref("Pensiones/"+this.props.target.ID+"/Comentarios/"+coment.ID).update({
            ValidadoBoss: true
        });
        var result=0;
        if(this.props.target.Rating==0){
            result = coment.RatingTotal;
        }else{
            result = (this.props.target.Rating + coment.RatingTotal)/2
        }
        var resultAseo=0;
        if(this.props.target.RatingAseo==0){
          resultAseo = coment.rating1;
        }else{
          resultAseo = (this.props.target.RatingAseo + coment.rating1)/2
        }
        var resultAmbiente=0;
        if(this.props.target.RatingAmbiente==0){
          resultAmbiente = coment.rating2;
        }else{
          resultAmbiente = (this.props.target.RatingAmbiente + coment.rating2)/2
        }
        var resultServicio=0;
        if(this.props.target.RatingServicios==0){
          resultServicio = coment.rating3;
        }else{
          resultServicio = (this.props.target.RatingServicios + coment.rating3)/2
        }

        
        firebase.database().ref("Pensiones/"+this.props.target.ID+"/Pension-Info").update({
            Rating: result,
            RatingAseo: resultAseo,
            RatingAmbiente: resultAmbiente,
            RatingServicios: resultServicio
        });
        firebase.database().ref("Pensiones/"+this.props.target.ID+"/Pension-Info").once('value', (data)=>{
            var newTarget = data.val();
            this.props.pensionTarget(newTarget)
        });




        var pension = firebase.database().ref('Pensiones/'+this.props.target.ID+'/Comentarios');
        pension.once('value', (dataSnapShot)=>{
        var coments=[];
        var uid =firebase.auth().currentUser.uid;
        dataSnapShot.forEach(element => {
        var coment = element.val()
            if (typeof coment==='object') {
            if( uid ==  coment.comentadorPorUser){
                this.setState({
                HaComentado: true,
                })
                
            }
            coments = coments.concat(coment);
            }
        })
        this.props.loadComents(coments)
        })
        this.props.navigation.navigate("CheckUser",{render:true})
}
    _onPressCancelComent=(coment)=>{
      firebase.database().ref("Pensiones/"+this.props.target.ID+"/Comentarios/"+coment.ID).update({
        ValidadoBoss: "cancelado",
    });
    var pension = firebase.database().ref('Pensiones/'+this.props.target.ID+'/Comentarios');
        pension.once('value', (dataSnapShot)=>{
        var coments=[];
        var uid =firebase.auth().currentUser.uid;
        dataSnapShot.forEach(element => {
        var coment = element.val()
            if (typeof coment==='object') {
            if( uid ==  coment.comentadorPorUser){
                this.setState({
                HaComentado: true,
                })
                
            }
            coments = coments.concat(coment);
            }
        })
        this.props.loadComents(coments)
        })
        this.props.navigation.navigate("CheckUser",{render:true})
    }
    
    UserCheck(){
        code=[]
        code.push(
            <Text>Estos Usuarios vivieron en tu pension?</Text>
        )
        
        for (let index = 0; index < this.props.coments.length; index++) {
            
            if (this.props.coments[index].ValidadoBoss ==false) {
                code.push(
                    <View>
                        <Text>{this.props.coments[index].NombreUser}</Text>
                        <Button
                        title="Confirmar"
                        onPress={this._onPressConfirmComent.bind(this,this.props.coments[index])}/>
                        <Button
                        title="Cancelar"
                        onPress={this._onPressCancelComent.bind(this,this.props.coments[index])}/>
                    </View>
                )
            }
        }
        return code;
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}></View>
                <View style={styles.center}>
                    {this.UserCheck()}
                </View>
                <View style={styles.footer}></View>
                
            </View>
            
        );
    }
}
function mapStateToProps(state){
    const {coments, target}=state;
    return {
      coments,
      target
    };
  }
  
  function mapDispatchToProps(dispatch){
    return{
      updateData: bindActionCreators(Actions.updateData,dispatch),
      updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
      loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
      loadComents: bindActionCreators(Actions.loadComents,dispatch),
      pensionTarget: bindActionCreators(Actions.pensionTarget,dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CheckUser);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 0.5,
      backgroundColor: 'lightblue',
    },
    center:{
      flex: 2,
      padding: 10,
      flexDirection:'row',
      alignItems:'stretch',
      justifyContent:'space-between'
    },
    penOpt:{
      justifyContent: 'flex-end',
    },
    footer:{
      justifyContent: 'flex-end',
      flex: 0.5,
    },
    fab:{
      backgroundColor: '#5067FF',
    },
    logOutButton:{
      backgroundColor: '#DD5144',
    },
    addButton:{
      backgroundColor: '#34A34F' 
    },
    accountButton:{
      backgroundColor: '#3B5998'
    }
  });