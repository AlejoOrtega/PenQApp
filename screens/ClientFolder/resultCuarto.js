import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, TextInput, Button} from 'react-native';
import Cuartos from '../../components/CuartosList';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class resultCuarto extends Component {
    constructor(props) {
      super(props)
      this.state={
      };
    }

    _onPressCuarto=(cuarto)=>{
      this.props.cuartoTarget(cuarto);
      this.props.navigation.navigate('ViewCuarto')
    }
    render(){
        return(
            <View>
                <Cuartos data={this.props.list} Press={this._onPressCuarto}/>
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
    engineResults: bindActionCreators(Actions.engineResults,dispatch),
    updateData: bindActionCreators(Actions.updateData,dispatch)
};
}

export default connect(mapStateToProps, mapDispatchToProps)(resultCuarto);
