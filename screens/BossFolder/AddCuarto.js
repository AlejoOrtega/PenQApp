import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase';


//Redux
import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';



class AddCuarto extends Component {
	constructor(props){
		super(props)
		this.state={
			alias:"",
			precio:0,
			capacidad:0,
			descripcion:'',
			observaciones:'',

		}
	}

	_onChangeAlias=(text)=>{
		this.setState({alias: text})
	}
	_onChangePrecio=(text)=>{
		this.setState({precio: text})
	}
	_onChangeCapacidad=(text)=>{
		this.setState({capacidad: text})
	}
	_onChangeDescripcion=(text)=>{
		this.setState({descripcion: text})
	}
	_onChangeObservaciones=(text)=>{
		this.setState({observaciones: text})
	}
	_onPressSendData=()=>{
		newCuarto = firebase.database().ref('Pensiones/'+this.props.target.ID+'/Cuartos');
		pushID = newCuarto.push().key;
		newCuarto.child(pushID).set({
			Alias: this.state.alias,
			Precio: this.state.precio,
			Capacidad: this.state.capacidad,
			Descrip: this.state.descripcion,
			Obser: this.state.observaciones,
			ID: pushID,
			PenID: this.props.target.ID
		})
		this.props.navigation.navigate('PensionView');
	}

	render(){
		return(
			<View style={styles.container}>
			<ScrollView>
				<View style={styles.header}></View>
				<View style={styles.center}>
					<Text>Ponle un nombre a este cuarto!</Text>
					<TextInput
					onChangeText={this._onChangeAlias}/>
					<Text>Precio</Text>
					<TextInput
					onChangeText={this._onChangePrecio}/>
					<Text>Capacidad del cuarto</Text>
					<TextInput
					onChangeText={this._onChangeCapacidad}/>
					<Text>Descripcion</Text>
					<TextInput
					onChangeText={this._onChangeDescripcion}/>
					<Text>Observaciones</Text>
					<TextInput
					onChangeText={this._onChangeObservaciones}/>
				</View>
				<View style={styles.footer}>
					<Button
					title='Confirmar y enviar datos'
					onPress={this._onPressSendData}/>
				</View>
				</ScrollView>
			</View>
		);
	}
}

function mapStateToProps(state){
	const {user, pensiones, target} = state;
	return{
	  user,
	  pensiones,
	  target
	};
 }
 
 function mapDispatchToProps(dispatch){
	return{
	  updateData: bindActionCreators(Actions.updateData,dispatch),
	  updateDataBoss: bindActionCreators(Actions.updateDataBoss, dispatch),
	};
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(AddCuarto);

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
	  padding: 10,
	},

	footer:{
	  justifyContent: 'flex-end',
	  flex: 0.5,
	},

 });