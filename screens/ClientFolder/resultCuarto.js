import React, { Component } from 'react';
import {Text, View} from 'react-native';
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
      this.props.navigation.navigate('VerCuarto')
    }
    onPressVerPension=(pension)=>{
      console.log(pension)
      this.props.pensionTarget(pension);
      this.props.navigation.navigate("PensionViewClient")
    }
    render(){
      if(this.props.list.length === 0){
        return(
          <View style={{marginTop:30}}>
              <Text>No hay pensiones con los parametros indicados</Text>
          </View>
        );
        
      }else{
        return(
          <View>
              <Cuartos data={this.props.list} Press={this._onPressCuarto} pension={this.props.pensiones} ViewPension={this.onPressVerPension}/>
          </View>
      );
      }
    }
}
function mapStateToProps(state){
    const {pensiones, list} = state;
    return{
      pensiones,
      list,
      pensiones
    };
  }
  
function mapDispatchToProps(dispatch){
return{
    pensionTarget: bindActionCreators(Actions.pensionTarget, dispatch),
    cuartoTarget: bindActionCreators(Actions.cuartoTarget,dispatch),
    engineResults: bindActionCreators(Actions.engineResults,dispatch),
    updateData: bindActionCreators(Actions.updateData,dispatch)
};
}

export default connect(mapStateToProps, mapDispatchToProps)(resultCuarto);
