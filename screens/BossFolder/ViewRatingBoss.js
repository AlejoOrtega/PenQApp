import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import firebase from 'firebase'



import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';
import StarRating from 'react-native-star-rating';

class ViewRatingBoss extends React.Component{
    
    _loadRatings(){
        code=[]
        rating1=this.props.target.RatingAseo;
        rating2=this.props.target.RatingAmbiente;
        rating3=this.props.target.RatingServicios;
        code.push(
          <View style = {{flexDirection: 'column', alignItems: 'center'}}>
            <View style = {styles.Rating}>
              <Text style={{ fontSize: 20 }}>Rating de Aseo</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                fullStarColor={'#fccb00'}
                rating={rating1}
              />
            </View>
            <View style = {styles.Rating}>
              <Text style={{ fontSize: 20 }}>Rating de Ambiente</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                fullStarColor={'#fccb00'}
                rating={rating2}
              />
            </View>
            <View style = {styles.Rating}>
              <Text style={{ fontSize: 20 }}>Rating de Servicio</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                fullStarColor={'#fccb00'}
                rating={rating3}
              />
            </View>
            
          </View>
        )

        return code;
    }
    
    
    
    
    
    
    render(){
        return(
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, margin: 10 }}>Mira los rating por diferentes categorias!!</Text>
            {this._loadRatings()}
          </View>
        );
    }
}

function mapStateToProps(state){
    const {target, coments}=state;
    return {
      target,
      coments
    };
  }
  
  function mapDispatchToProps(dispatch){
    return{
      updateData: bindActionCreators(Actions.updateData,dispatch),
      updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
      loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
      loadComents: bindActionCreators(Actions.loadComents,dispatch)
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewRatingBoss);

  const styles = StyleSheet.create({
    Rating:{
      margin: 20,
    }
  });