import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Button,
} from 'react-native'
import MapView from 'react-native-maps';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class LocatePension extends Component{
  constructor(props){
		super(props);
    
		this.state={
      region: {
        latitude:10.9878,
        longitude:-74.7889,
        latitudeDelta:0.1,
        longitudeDelta:0.1
      },
      x:{
        latitude:11.004582,
        longitude:-74.822574
      }
		}
		this._onPress=this._onPress.bind(this);
  }


  _onPress=()=>{
		this.props.coordinate(this.state.x);
		this.props.navigation.goBack();
	}
	
    render(){
      return(
			<View style={styles.container}>
				<MapView style = {styles.map} 
					region={{
						latitude:10.9878,
						longitude:-74.7889,
						latitudeDelta:0.1,
						longitudeDelta:0.1
						
					}}> 
						<MapView.Marker
							draggable
							coordinate={this.state.x}
							onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
							/>
							
				</MapView>
				<Button
					style={styles.button}
				  title='Termine!'
				  onPress={this._onPress}
				  />
			</View>
        
      );
  
    }
  }
	
	function mapStateToProps(state){
    return{
    };
  }
  
  function mapDispatchToProps(dispatch){
    return{
      coordinate: bindActionCreators(Actions.coordinates,dispatch),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LocatePension);

  const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column',
		justifyContent: 'flex-end'
	}, 
	map:{
        position: 'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0
	 },
	 button:{
		 alignSelf: 'flex-end',
	 }
  });