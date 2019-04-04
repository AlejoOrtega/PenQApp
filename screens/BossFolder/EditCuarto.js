import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class EditPension extends Component {
	constructor(props) {
		super(props)
		this.state={
			descrip:'',
			capa:'',
			obser:'',
			precio:'',
		};
	}

	_onPressSendData=()=>{
		firebase.database().ref('Pensiones/'+this.props.target.ID+'/Cuartos/'+this.props.cuartoTarget.ID).update({
			Capacidad: this.state.capa,
			Descrip: this.state.descrip,
			Obser: this.state.obser,
			Precio: this.state.precio,
		})
	}
	_onChangeDescrip=(text)=>{
		this.setState({descrip: text})
	}
	_onChangeCapa=(text)=>{
		this.setState({descrip: text})
	}
	_onChangeObser=(text)=>{
		this.setState({descrip: text})
	}
	_onChangePrecio=(text)=>{
		this.setState({descrip: text})
	}

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.header}>

				<Text>Modifique los datos de este cuarto!</Text>

				</View>
				<View style={styles.center}>

					<Text>Descripcion</Text>
					<TextInput
					style={styles.textInput}
					placeholder={this.props.cuartoTarget.Descrip}
					onChangeText={this._onChangeDescrip}/>
					<Text>Capacidad</Text>
					<TextInput
					style={styles.textInput}
					placeholder={this.props.cuartoTarget.Capacidad}
					onChangeText={this._onChangeCapa}/>
					<Text>Observaciones</Text>
					<TextInput
					style={styles.textInput}
					placeholder={this.props.cuartoTarget.Obser}
					onChangeText={this._onChangeObser}/>
					<Text>Precio</Text>
					<TextInput
					style={styles.textInput}
					placeholder={this.props.cuartoTarget.Precio}
					onChangeText={this._onChangePrecio}/>

				</View>
				<View style={styles.footer}>
				<Button
					title='Confirmar y enviar datos!'
					onPress={this._onPressSendData}/>
				</View>
			</View>
		);
	}
}

function mapStateToProps(state){
	const {cuartoTarget, target} = state;
	return{
		cuartoTarget,
		target
	};
 }
 
 function mapDispatchToProps(dispatch){
	return{
	  updateData: bindActionCreators(Actions.updateData,dispatch)
	};
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(EditPension);

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
	footer:{
	  justifyContent: 'flex-end',
	  flex: 0.5,
	},textInput:{
    borderColor: 'black',
    backgroundColor: 'grey',
  },
 });