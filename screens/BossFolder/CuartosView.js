import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button as Btn, Rating} from 'react-native-elements';
import {Button, Icon, Fab } from 'native-base';
import Service from '../../components/Services';
import CuartosList from '../../components/CuartosList';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';


class CuartosView extends React.Component {
	constructor(props){
			super(props);
	}

	_onPressCuarto=(cuarto)=>{
		this.props.cuartoTarget(cuarto);
		this.props.navigation.navigate('ViewCuarto')
	}

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.header}>
				<Text>Estos son los cuarto disponible en tu pension</Text>
				</View>
				<View style={styles.center}>
					<CuartosList data={this.props.cuartos} Press={this._onPressCuarto}/>
				</View>
				<View style={styles.footer}>
				</View>
			</View>
		);
	}
}

function mapStateToProps(state){
	const {cuartos}=state;
	return {
		cuartos
	};
 }
 
 function mapDispatchToProps(dispatch){
	return{
		cuartoTarget: bindActionCreators(Actions.cuartoTarget,dispatch),
	};
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(CuartosView);
 const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	},
	header:{
	  justifyContent: 'center',
	  alignItems: 'center',
	  flex: 0.5,
	  backgroundColor: 'lightblue',
	},
	center:{
	  flex: 2,
	  padding: 10
	},
	penOpt:{
	  justifyContent: 'flex-end',
	},
	footer:{
	  justifyContent: 'flex-end',
	  flex: 0.5,
	},
	fab:{
	  backgroundColor: '#5067FF',
	},
	logOutButton:{
	  backgroundColor: '#DD5144',
	},
	addButton:{
	  backgroundColor: '#34A34F' 
	},
	accountButton:{
	  backgroundColor: '#3B5998'
	}
 });