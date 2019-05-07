import React from 'react';
import { View, StyleSheet } from 'react-native';
import DetallesCuartos from '../../components/DetallesCuarto';
import SwiperC from '../../components/SwiperC';
import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';


class ViewCuarto extends React.Component {
	
	componentDidMount(){
		pics=[this.props.cuartoTarget.Url1, this.props.cuartoTarget.Url2, this.props.cuartoTarget.Url3];
		this.props.loadPic(pics)
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
		loadPic: bindActionCreators(Actions.picsroom,dispatch)
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