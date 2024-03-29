import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pensiones from '../../components/CardList'

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

//Vista principal del cliente
class ClientStart extends React.Component {
  
  componentDidMount(){
    var list =[];
      for (let index = 0; index < this.props.pensiones.length; index++) {
        if(this.props.pensiones[index].Rating>=4){
          list = list.concat(this.props.pensiones[index])
        }
      }
        for (let x = 0; x < list.length; x++) {
          for (let i = 0; i < list.length-x-1; i++) {
              if(list[i].Rating < list[i+1].Rating){
                  let tmp = list[i+1];
                  list[i+1] = list[i];
                  list[i] = tmp;
              }
          }
      }
      this.props.engineResults(list);
    
    
  }

    _onPressPension=(pension)=>{
      this.props.pensionTarget(pension);
      this.props.navigation.navigate('PensionViewClient');
  }
  
  render() {
    return (
      <View style={styles.container}>
       <Text>Bienvenido!!</Text>
       <Pensiones data={this.props.list} Press={this._onPressPension}/>
      </View>
    );
    
  }
}

function mapStateToProps(state){
  const {pensiones, list} = state;
  return{
    pensiones,
    list
  };
}

function mapDispatchToProps(dispatch){
  return{
    pensionTarget: bindActionCreators(Actions.pensionTarget, dispatch),
    engineResults: bindActionCreators(Actions.engineResults,dispatch),
    updateData: bindActionCreators(Actions.updateData,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientStart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});