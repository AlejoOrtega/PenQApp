import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button as Btn, Rating} from 'react-native-elements';
import {Button, Icon, Fab } from 'native-base';
import Service from '../../components/Services';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';


class RatingPension extends React.Component {
    constructor(props){
        super(props);
  
        this.state={
          user:'',
        }
        
    }
    render(){
        return(
            <View>
                <Text>{this.props.target.Alias}</Text>
            </View>
        );
    }
}

function mapStateToProps(state){
    const {target}=state;
    return {
      target
    };
  }
  
  function mapDispatchToProps(dispatch){
    return{
      updateData: bindActionCreators(Actions.updateData,dispatch),
      updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
      loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(RatingPension);