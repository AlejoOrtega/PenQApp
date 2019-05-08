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
				<View style={styles.center}>
					<View style = {{width: '90%', alignItems: 'center', flex: 2}}>
						<SwiperC 
          	pictures={this.props.picsroom}/>
					</View>
					<View style = {{width: '90%',alignItems: 'flex-start', paddingHorizontal: '5%', flex:1, borderWidth: 1}}>
							<DetallesCuartos data={this.props.cuartoTarget} />
					</View>
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
	center:{
	  flex: 2,
		alignItems: 'center', 
	},
	logo:{
		width: '90%',
		height: '70%', 
		alignSelf:'center',
		borderWidth: 1,
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