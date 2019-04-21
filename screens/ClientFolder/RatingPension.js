import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';



import StarRating from 'react-native-star-rating';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';


class RatingPension extends React.Component {
    constructor(props){
        super(props);
  
        this.state={
          ratingaseo:1,
          ratingambiente: 1,
          ratingservicio: 1,
          totalRating: 0,
          comentario: ''
        }
        
    }
    onStarRatingPressAseo(rating){
      this.setState({ratingaseo:rating})
    }

    onStarRatingPressAmbiente(rating){
      this.setState({ratingambiente:rating})
    }

    onStarRatingPressServicio(rating){
      this.setState({ratingservicio:rating})
    }

    onClickCalificar=()=>{
      var pensionComentariosref = firebase.database().ref('Pensiones/' + this.props.target.ID + '/Comentarios');
      pushID = pensionComentariosref.push().key;
      pensionComentariosref.child(pushID).set({
        comentadorPorUser: firebase.auth().currentUser.uid,
        comentario: this.state.comentario,
        rating1: this.state.ratingaseo,
        rating2: this.state.ratingambiente,
        rating3: this.state.ratingservicio,
        RatingTotal: (this.state.ratingaseo+this.state.ratingambiente+this.state.ratingservicio)/3,
        ID: pushID,
      })
      this.props.navigation.navigate('PensionViewClient')
    }
    render(){
        return(
          <View style={styles.container}>
            <Text>{this.props.target.ID}</Text>
            <View styles={styles.header}>
              <Text>Califica esta pension!</Text>
            </View>
            <View>
              <Text>Aseo</Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.ratingaseo}
                selectedStar={(rating) => this.onStarRatingPressAseo(rating)}                
              />
              <Text>Ambiente</Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.ratingambiente}
                selectedStar={(rating) => this.onStarRatingPressAmbiente(rating)}                
              />
              <Text>Servicio</Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.ratingservicio}
                selectedStar={(rating) => this.onStarRatingPressServicio(rating)}                
              />
            </View>
            <View style = {styles.textAreaContainer}>
              <Text>Escribe un comentario relatandonos tu historia con esta pension</Text>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Escribe algo"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                onChangeText={(text) => this.setState({comentario:text})}
                value={this.state.comentario}
              />
            </View>
            <View style={styles.footer}>
                <Button 
                  title='Registrar calificacion y comentario'
                  onPress={this.onClickCalificar}/>
            </View>
          </View>
        );
    }
}

function mapStateToProps(state){
    const {target}=state;
    return {
      target
    };
  }
  
  function mapDispatchToProps(dispatch){
    return{
      updateData: bindActionCreators(Actions.updateData,dispatch),
      updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
      loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(RatingPension);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput:{
      borderColor: 'black',
      backgroundColor: 'grey',
    },
    edit:{
      color: 'blue',
      fontSize: 20,
    },
    header:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 3,
    },
    center:{
      justifyContent: 'center',
      flex: 3,
    },
    footer:{
      flexDirection: 'row',
      alignItems: 'baseline',
      flex: 3,
    },
    textAreaContainer: {
      borderColor: 'grey',
      borderWidth: 1,
      padding: 5
    },
    textArea: {
      height: 150,
      justifyContent: "flex-start"
    }
  });