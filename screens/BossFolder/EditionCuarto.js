import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import firebase from 'firebase';
import ProfilePhoto from '../../components/ProfilePhoto';
import {ImagePicker} from 'expo';


import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';

class EditionCuarto extends Component {
	constructor(props) {
		super(props)
		this.state={
			descrip:this.props.cuartoTarget.Descrip,
			capa:this.props.cuartoTarget.Capacidad,
			obser:this.props.cuartoTarget.Obser,
			precio:this.props.cuartoTarget.Precio,
		};
	}
	
	onPressChangePicture= async()=>{
		let result = await ImagePicker.launchImageLibraryAsync();
		if(!result.cancelled){
			this.uploadImage2fire(result.uri, "Cuarto"+this.props.cuartoTarget.ID+"1",1)
			.then(()=>{
				alert("Great!");
			}).catch((error)=>{
				alert(error);
			})
		}
	}
	onPressChangePicture2= async()=>{
		let result = await ImagePicker.launchImageLibraryAsync();
		if(!result.cancelled){
			this.uploadImage2fire(result.uri, "Cuarto"+this.props.cuartoTarget.ID+"2",2)
			.then(()=>{
				alert("Great!");
			}).catch((error)=>{
				alert(error);
			})
		}
	}
	onPressChangePicture3= async()=>{
		let result = await ImagePicker.launchImageLibraryAsync();
		if(!result.cancelled){
			this.uploadImage2fire(result.uri, "Cuarto"+this.props.cuartoTarget.ID+"3",3)
			.then(()=>{
				alert("Great!");
			}).catch((error)=>{
				alert(error);
			})
		}
	}
	uploadImage2fire=async(uri, ImageName, picNumber)=>{
		const blob = await new Promise((resolve, reject)=>{
			const xhr = new XMLHttpRequest();
			xhr.onload = function(){
				resolve(xhr.response);
			};
			xhr.onerror = function(){
				reject(new TypeError('Network request failed'));
			};
			xhr.responseType = 'blob';
			xhr.open('GET',uri,true);
			xhr.send(null);
		});
		await firebase.storage().ref().child("Images/"+ImageName).put(blob);

		firebase.storage().ref().child('Images/'+ImageName).getDownloadURL().then(url=>{
				if(picNumber==1){
						this.props.uploadPicture1(url)
				}else if (picNumber==2){
						this.props.uploadPicture2(url)
				}else{
						this.props.uploadPicture3(url)
				}
		})
	}

	_onPressSendData=()=>{
		this.props.cuartoTarget.Descrip= this.state.descrip;
		this.props.cuartoTarget.Capacidad= this.state.capa;
		this.props.cuartoTarget.Obser=this.state.obser;
		this.props.cuartoTarget.Precio=this.state.precio;
		firebase.database().ref('Pensiones/'+this.props.target.ID+'/Cuartos/'+this.props.cuartoTarget.ID).update({
			Capacidad: this.state.capa,
			Descrip: this.state.descrip,
			Obser: this.state.obser,
			Precio: this.state.precio,
			Url1 : this.props.picture1,
      Url2 : this.props.picture2,
      Url3 : this.props.picture3,
		})
		pics=[this.props.picture1, this.props.picture2, this.props.picture3]
		this.props.uploadPics(pics)
		this.props.navigation.navigate('ViewCuarto',{render: true})
	}
	_onChangeDescrip=(text)=>{
		this.setState({descrip: text})
	}
	_onChangeCapa=(text)=>{
		this.setState({capa: text})
	}
	_onChangeObser=(text)=>{
		this.setState({obser: text})
	}
	_onChangePrecio=(text)=>{
		this.setState({precio: text})
	}

	render(){
		return(
			<ScrollView>
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
					<View style={styles.PhotoAndButton}>
					<ProfilePhoto uri={this.props.picture1}/>
					<Button
					title="Cambiar"
					onPress={this.onPressChangePicture}/>
				</View>
				<View style={styles.PhotoAndButton}>
					<ProfilePhoto uri={this.props.picture2}/>
					<Button
					title="Cambiar"
					onPress={this.onPressChangePicture2}/>
				</View>
				<View style={styles.PhotoAndButton}>
					<ProfilePhoto uri={this.props.picture3}/>
					<Button
					title="Cambiar"
					onPress={this.onPressChangePicture3}/>
				</View>
				</View>
				<View style={styles.footer}>
				<Button
					title='Confirmar y enviar datos!'
					onPress={this._onPressSendData}/>
				</View>
			</ScrollView>
		);
	}
}

function mapStateToProps(state){
	const {cuartoTarget, target,picture1,picture2,picture3} = state;
	return{
		cuartoTarget,
		target,
		picture1,
		picture2,
		picture3
	};
 }
 
 function mapDispatchToProps(dispatch){
	return{
		updateData: bindActionCreators(Actions.updateData,dispatch),
		uploadPicture1: bindActionCreators(Actions.picture1, dispatch),
    uploadPicture2: bindActionCreators(Actions.picture2, dispatch),
    uploadPicture3: bindActionCreators(Actions.picture3, dispatch),
		uploadPics: bindActionCreators(Actions.pics,dispatch),
	};
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(EditionCuarto);

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