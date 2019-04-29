import React, { Component } from 'react';
import {Text, View} from 'react-native';
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
      if(this.props.list.length != 0){
        return(
            <View>
                <Pension data={this.props.list} Press={this._onPressPension} />
            </View>
        );
      }else{
        return(
          <View style={{marginTop:30}}>
              <Text>No hay pensiones con los parametros indicados</Text>
          </View>
        );
      }
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
    pensionTarget: bindActionCreators(Actions.pensionTarget, dispatch),
    engineResults: bindActionCreators(Actions.engineResults,dispatch),
    updateData: bindActionCreators(Actions.updateData,dispatch)
};
}

export default connect(mapStateToProps, mapDispatchToProps)(resultPension);
