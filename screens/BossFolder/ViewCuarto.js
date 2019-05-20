import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import DetallesCuartos from '../../components/DetallesCuarto';
import SwiperC from '../../components/SwiperC';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';


class ViewCuarto extends React.Component {
	

	componentDidMount(){
		pics=[this.props.cuartoTarget.Url1,this.props.cuartoTarget.Url2,this.props.cuartoTarget.Url3]
		// this.props.uploadPicture1(this.props.cuartoTarget.Url1)
		// this.props.uploadPicture2(this.props.cuartoTarget.Url2)
		// this.props.uploadPicture3(this.props.cuartoTarget.Url3)
		this.props.uploadPicsroom(pics);
	}
	_onPressEditCuarto=()=>{
		this.props.navigation.navigate('EditionCuarto')
	}
	eliminarCuarto=()=>{
		console.log('WHAT HAPPEN?')
		firebase.database().ref('Pensiones/'+this.props.target.ID+'/Cuartos/'+this.props.cuartoTarget.ID).remove();
		var cuartos = firebase.database().ref('Pensiones/'+this.props.target.ID+'/Cuartos');
    cuartos.once('value', (snap)=>{
      var cuartos=[]
      snap.forEach((childSnap)=>{
        var futu = childSnap.val();

        if(typeof futu === 'object'){
          cuartos=cuartos.concat(childSnap.val());
        }  
      })
      this.props.loadCuartos(cuartos);
    })
    this.props.navigation.navigate('CuartosView');
	}

	_onPressEliminarCuarto=()=>{
    Alert.alert(
      '¡Cuidado!',
      '¿Seguro deseas eliminar este cuarto?',
      [
        {
          text: 'No',
          onPress: () => console.log('Operation Aborted'),
          style: 'cancel',
        },
        {text: 'Si', onPress:this.eliminarCuarto},
      ],
      {cancelable: false},
    );
  }
	
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.header}>
				<SwiperC 
        pictures={this.props.picsroom}/>
				</View>
				<View style={styles.center}>
					<DetallesCuartos data={this.props.cuartoTarget}/>
				</View>
				<View style={styles.footer}>
					<Button
					title='Editar'
					color = '#7b68ee'
					onPress={this._onPressEditCuarto}/>
					<Button
					title='Eliminar Cuarto'
					color = '#b22222'
					onPress={this._onPressEliminarCuarto}/>
				</View>
			</View>
		);
	}
}

function mapStateToProps(state){
	const {cuartoTarget,target,picsroom}=state;
	return {
		cuartoTarget,
		target,
		picsroom
	};
 }
 
 function mapDispatchToProps(dispatch){
	return{
		loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
		uploadPicture1: bindActionCreators(Actions.picture1, dispatch),
    uploadPicture2: bindActionCreators(Actions.picture2, dispatch),
    uploadPicture3: bindActionCreators(Actions.picture3, dispatch),
		uploadPicsroom: bindActionCreators(Actions.picsroom,dispatch),
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
	  flex: 3,
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
		flexDirection: 'row',
	  justifyContent: 'space-evenly',
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