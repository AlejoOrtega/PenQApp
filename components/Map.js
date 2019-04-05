import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  InteractionManager
} from 'react-native'
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from './tools/redux/Actions';
import {bindActionCreators} from 'redux';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 10.9878,
        longitude: -74.7889,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      x: {
        latitude: 11.004582,
        longitude: -74.822574
      }
    }
  }

  markerCreator() {
    let code = []
    if (this.props.pensiones != null) {
      var pensiones = Object.values(this.props.pensiones);
      for (var i = 0; i < pensiones.length; i = i + 1) {
        code.push(
          <MapView.Marker
            coordinate={pensiones[i].coordinates}
            onPress={this.props.PressM.bind(this, pensiones[i])}
          />
        )
      }
    }
    return (code);
  }


  render() {
    return (
      <MapView style={styles.map}
        region={{
          latitude: 10.9878,
          longitude: -74.7889,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}>
        {this.markerCreator()}
      </MapView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);

const styles = StyleSheet.create({
  inputText: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    bottom: 20,
    color: 'black'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});