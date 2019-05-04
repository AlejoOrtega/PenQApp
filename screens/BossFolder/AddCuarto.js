import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import firebase from 'firebase';

import {ImagePicker} from 'expo';
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
			foto1:false,
        	foto2:false,
        	foto3:false,

		}
	}
	componentDidMount(){
        this.props.uploadPicture1("none")
        this.props.uploadPicture2("none")
        this.props.uploadPicture3("none")
	}
	_onPressPictures1= async()=>{
        let result = await ImagePicker.launchImageLibraryAsync();
        this.props.uploadPicture1(result)   
        this.setState({
            foto1: true
        })
    }
    _onPressPictures2= async()=>{
        let result = await ImagePicker.launchImageLibraryAsync();
        this.props.uploadPicture2(result)   
        this.setState({
            foto2: true
        })
    }
    _onPressPictures3=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync();
        this.props.uploadPicture3(result)   
        this.setState({
            foto3: true
        })
	}
	uploadImage2fire=async(uri, ImageName, picNumber, id)=>{
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

       await firebase.storage().ref().child('Images/'+ImageName).getDownloadURL().then(url=>{
            if(picNumber==1){
				this.props.uploadPicture1(url)
				firebase.database().ref("Pensiones/"+this.props.target.ID+"/Cuartos/"+id).update({
					Url1: url,
				})
            }else if (picNumber==2){
				this.props.uploadPicture2(url)
				firebase.database().ref("Pensiones/"+this.props.target.ID+"/Cuartos/"+id).update({
					Url2: url,
				})
            }else{
				this.props.uploadPicture3(url)
				firebase.database().ref("Pensiones/"+this.props.target.ID+"/Cuartos/"+id).update({
					Url3: url,
				})
            }
        })
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
	_onPressSendData=async ()=>{
		newCuarto = firebase.database().ref('Pensiones/'+this.props.target.ID+'/Cuartos');
		pushID = newCuarto.push().key;
		newCuarto.child(pushID).set({
			Alias: this.state.alias,
			Precio: this.state.precio,
			Capacidad: this.state.capacidad,
			Descrip: this.state.descripcion,
			Obser: this.state.observaciones,
			ID: pushID,
			PenID: this.props.target.ID,
			Url1: this.props.picture1,
			Url2: this.props.picture2,
			Url3: this.props.picture3,
		})
		if(this.props.picture1!="none"){
            if(!this.props.picture1.cancelled){
                 this.uploadImage2fire(this.props.picture1.uri, "Cuarto"+pushID+"1", 1, pushID)
            }
        }
        if(this.props.picture2!="none"){
            if(!this.props.picture2.cancelled){
                 this.uploadImage2fire(this.props.picture2.uri, "Cuarto"+pushID+"2", 2, pushID)
            }
        }
        if(this.props.picture3!="none"){
            if(!this.props.picture3.cancelled){
                 this.uploadImage2fire(this.props.picture3.uri, "Cuarto"+pushID+"3", 3, pushID)
            }
		}
		
		
		this.props.navigation.navigate('PensionView');
	}

	render(){
		return(
			<ScrollView style={styles.neatScroll}>
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
					<Button
                    title='Agrega fotos!'
                    onPress={this._onPressPictures1}
                    color={this.state.foto1 == true ? '#01ad1b':'#7c0a00'}
                    />
                    <Button
                    title='Agrega fotos!'
                    onPress={this._onPressPictures2}
                    color={this.state.foto2 == true ? '#01ad1b':'#7c0a00'}
                    />
                    <Button
                    title='Agrega fotos!'
                    onPress={this._onPressPictures3}
                    color={this.state.foto3 == true ? '#01ad1b':'#7c0a00'}
                    />
				</View>
				<View style={styles.footer}>
					<Button
					title='Confirmar y enviar datos'
					onPress={this._onPressSendData}/>
				</View>
				</ScrollView>
		);
	}
}

function mapStateToProps(state){
	const {user, pensiones, target, picture1, picture2, picture3} = state;
	return{
	  user,
	  pensiones,
	  target,
	  picture1,
	  picture2,
	  picture3
	};
 }
 
 function mapDispatchToProps(dispatch){
	return{
	  updateData: bindActionCreators(Actions.updateData,dispatch),
	  updateDataBoss: bindActionCreators(Actions.updateDataBoss, dispatch),
	  uploadPicture1: bindActionCreators(Actions.picture1,dispatch),
	  uploadPicture2: bindActionCreators(Actions.picture2,dispatch),
	  uploadPicture3: bindActionCreators(Actions.picture3,dispatch),
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