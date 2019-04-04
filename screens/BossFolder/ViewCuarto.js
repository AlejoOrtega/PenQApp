import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button, Rating} from 'react-native-elements';
import { Icon, Fab } from 'native-base';
import Service from '../../components/Services';
import CuartosList from '../../components/CuartosList';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';


class ViewCuarto extends React.Component {
	
	_onPressEditCuarto=()=>{
		this.props.navigation.navigate('EditCuarto')
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.header}>

				</View>
				<View style={styles.center}>
					<Text>Aqui va el alias</Text>
					<Text>{this.props.cuartoTarget.Descrip}</Text>
					<Text>{this.props.cuartoTarget.Capacidad}</Text>
					<Text>{this.props.cuartoTarget.Obser}</Text>
					<Text>{this.props.cuartoTarget.Precio}</Text>
				</View>
				<View style={styles.footer}>
					<Button
					title='Editar'
					onPress={this._onPressEditCuarto}/>
				</View>
			</View>
		);
	}
}

function mapStateToProps(state){
	const {cuartoTarget}=state;
	return {
		cuartoTarget
	};
 }
 
 function mapDispatchToProps(dispatch){
	return{
	};
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(ViewCuarto);

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