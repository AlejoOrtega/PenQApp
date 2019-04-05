import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
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
  
  render() {
    return (
      <View style={styles.container}>
        <Map PressM={this._onPressMarker}></Map>
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
    justifyContent: 'center',
  },
});