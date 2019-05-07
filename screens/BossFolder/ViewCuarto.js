import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import DetallesCuartos from '../../components/DetallesCuarto';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';


class ViewCuarto extends React.Component {
	
	_onPressEditCuarto=()=>{
		this.props.navigation.navigate('EditionCuarto')
	}
	_onPressEliminarCuarto=()=>{
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
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.header}>

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
	const {cuartoTarget,target}=state;
	return {
		cuartoTarget,
		target
	};
 }
 
 function mapDispatchToProps(dispatch){
	return{
		loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
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