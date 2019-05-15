import React from 'react';
import { StyleSheet, View, Button, TouchableHighlight, Image } from 'react-native';
import Map from '../../components/Map'
import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';
//Vista principal del cliente
class ClientMap extends React.Component {
  
  _onPressMarker=(pension)=>{
    this.props.pensionTarget(pension);
    this.props.navigation.navigate('PensionViewClient');
  }
  engine=()=>{
    this.props.navigation.navigate('Engine')
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Map PressM={this._onPressMarker}></Map>
        <View style={{width:'100%', alignItems:'flex-end'}}>
          <TouchableHighlight
          style={styles.button}
          onPress={this.engine}>
            <Image 
            style={{width:50,height:50}}
            source={require('../Image/filtro.png')}/>
          </TouchableHighlight>
        </View>

      </View>
    ); 
  }
}


function mapStateToProps(state){
  const {pensiones} = state;
  return {pensiones};
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch),
    updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
    pensionTarget: bindActionCreators(Actions.pensionTarget,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientMap);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  button:{
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    backgroundColor:'#fff',
    marginTop:20,
    alignItems:'center',
    height:60,
    justifyContent:'center',
    width:'20%',
    opacity:0.9,
  }
});