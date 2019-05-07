import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import DetallesCuartos from '../../components/DetallesCuarto';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';


class ViewCuarto extends React.Component {
	

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.center}>
					<View style = {{width: '90%', alignItems: 'center'}}>
						<Image
							style={styles.logo}
							source={require('../images/PensionProfileScreen_elN700x450FrontYardIdeasBedheadGarden_345528.jpg')}
						/>
						<View style = {{width: '90%',alignItems: 'flex-start', paddingHorizontal: '5%'}}>
							<DetallesCuartos data={this.props.cuartoTarget} />
						</View>
						
					</View>
				</View>
				<View style={styles.footer}>
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
	center:{
	  flex: 2,
		padding: 10,
		alignItems: 'center'
	},
	logo:{
		width: '90%',
		height: '70%', 
		alignSelf:'center',
		marginBottom: 20, borderWidth: 1,
		borderColor:'black'
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