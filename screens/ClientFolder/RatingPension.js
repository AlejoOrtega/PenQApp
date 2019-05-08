import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import {isSignedIn} from '../../components/tools/Auth'


import StarRating from 'react-native-star-rating';

import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';


class RatingPension extends React.Component {
    constructor(props){
        super(props);
  
        this.state={
          NombreUser:"",
          ratingaseo:1,
          ratingambiente: 1,
          ratingservicio: 1,
          totalRating: 0,
          comentario: '',
          validado:false,
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
        NombreUser: this.props.user.Nombre + " "+ this.props.user.Apellido,
        comentadorPorUser: firebase.auth().currentUser.uid,
        comentario: this.state.comentario,
        rating1: this.state.ratingaseo,
        rating2: this.state.ratingambiente,
        rating3: this.state.ratingservicio,
        RatingTotal: (this.state.ratingaseo+this.state.ratingambiente+this.state.ratingservicio)/3,
        ID: pushID,
        ValidadoBoss: this.state.validado,
        photoUri: this.props.user.photoUri,
      })
      var pension = firebase.database().ref('Pensiones/'+this.props.target.ID+'/Comentarios');
      pension.once('value', (dataSnapShot)=>{
        var coments=[];
        var totalR=0;
        var totalComentarios=0;
        dataSnapShot.forEach(element => {
          
          if (typeof element.val()==='object') {
            if(firebase.auth().currentUser.uid ==  element.comentadorPorUser){
              this.setState({
                HaComentado: true,
              })
            }
            if(element.Validado==true){
              totalR = totalR + element.RatingTotal;
              totalComentarios=totalComentarios+1;
            }
            coments = coments.concat(element.val());
          }
        })
        this.props.loadComents(coments)
        this.setState({
          ratingTotal: totalR,
          comentarioValidado: totalComentarios
        })                
        });
         
      this.props.navigation.navigate('PensionViewClient',{render: true})
    }
    render(){
        return(
          <View style={styles.container}>
            <View styles={styles.header}>

            </View>
            <View style={{ margin: 10 }}>
              <View style = {{margin: 10}}>
                <Text style={{ fontSize: 18 }}>Aseo</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.ratingaseo}
                  fullStarColor={'#fccb00'}
                  selectedStar={(rating) => this.onStarRatingPressAseo(rating)}
                />
              </View>
              <View style = {{margin: 10}}>
                <Text style={{ fontSize: 18 }}>Ambiente</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.ratingambiente}
                  fullStarColor={'#fccb00'}
                  selectedStar={(rating) => this.onStarRatingPressAmbiente(rating)}
                />
              </View>
              <View style = {{margin: 10}}>
                <Text style={{ fontSize: 18 }}>Servicio</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.ratingservicio}
                  fullStarColor={'#fccb00'}
                  selectedStar={(rating) => this.onStarRatingPressServicio(rating)}
                />
              </View>

            </View>
            <View style = {styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Escribe tu comentario sobre esta pension!"
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
                  color = '#7b68ee'
                  onPress={this.onClickCalificar}/>
            </View>
          </View>
        );
    }
}

function mapStateToProps(state){
    const {target, user}=state;
    return {
      target,
      user
    };
  }
  
  function mapDispatchToProps(dispatch){
    return{
      updateData: bindActionCreators(Actions.updateData,dispatch),
      updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch),
      loadCuartos: bindActionCreators(Actions.loadCuartos,dispatch),
      loadComents: bindActionCreators(Actions.loadComents, dispatch)
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
      marginTop: '5%',
      flexDirection: 'row',
      alignItems: 'baseline',
      flex: 2,
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