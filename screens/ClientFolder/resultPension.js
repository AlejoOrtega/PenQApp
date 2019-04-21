import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, TextInput, Button} from 'react-native';
import Pension from '../../components/CardList'

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class resultPension extends Component {
    constructor(props) {
      super(props)
      this.state={
      };
    }

    _onPressPension=(pension)=>{
        this.props.pensionTarget(pension);
        this.props.navigation.navigate('PensionViewClient');
      }
    render(){
        return(
            <View>
                <Pension data={this.props.list} Press={this._onPressPension} />
            </View>
        );
    }
}
function mapStateToProps(state){
    const {pensiones,list} = state;
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

export default connect(mapStateToProps, mapDispatchToProps)(resultPension);
