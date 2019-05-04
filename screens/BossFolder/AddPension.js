import React, { Component } from 'react';
import { View, Text,StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import CheckBox from 'react-native-check-box';
import firebase from 'firebase';

import {ImagePicker, Permissions} from 'expo';

import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';



class AddPension extends Component {
    constructor(props) {
      super(props)
      this.state={
        alias:'',
        direction:'',
        specific:'',
        rules:'',
        barrio:'',
        isCheckedComida: false,
        isCheckedInternet: false,
        isCheckedCuarto: false,
        isCheckedLlave: false,
        isCheckedAseo: false,
        isCheckedLavado: false,
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
    _onPressLocatePension=()=>{
        this.props.navigation.navigate('Locate');
    }
    _onChangeAlias=(text)=>{
        this.setState({alias: text});
    }
    _onChangeDirection=(text)=>{
        this.setState({direction: text});
    }
    _onChangeSpecifications=(text)=>{
        this.setState({specific: text});
    }
    _onChangeRules=(text)=>{
        this.setState({rules: text});
    }
    _onChangeBarrio=(text)=>{
        this.setState({barrio: text});
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
    uploadImage2fire=async(uri, ImageName, picNumber,id)=>{
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
                firebase.database().ref("Pensiones/"+id+"/Pension-Info/").update({
					Url1: url,
				})
            }else if (picNumber==2){
                this.props.uploadPicture2(url)
                firebase.database().ref("Pensiones/"+id+"/Pension-Info/").update({
					Url2: url,
				})
            }else{
                this.props.uploadPicture3(url)
                firebase.database().ref("Pensiones/"+id+"/Pension-Info/").update({
					Url3: url,
				})
            }
        })
      }

    _onPressSendData=()=>{
        currentUser = firebase.auth().currentUser;
        newItem = firebase.database().ref('Pensiones/');
        pushID = newItem.push().key;
        newItem.child(pushID+'/Pension-Info').set({
            Alias: this.state.alias,
            Direccion: this.state.direction,
            Especific: this.state.specific,
            Reglas: this.state.rules,
            Barrio: this.state.barrio,
            Comida: this.state.isCheckedComida,
            Internet: this.state.isCheckedInternet,
            Llaves: this.state.isCheckedLlave,
            Aseo: this.state.isCheckedAseo,
            Lavado: this.state.isCheckedLavado,
            ID: pushID,
            coordinates: this.props.coordinates,
            bossID: currentUser.uid,
            Rating: 0,
            RatingAseo:0,
            RatingAmbiente:0,
            RatingServicios:0,
            Url1: this.props.picture1,
            Url2: this.props.picture2,
            Url3: this.props.picture3,
        });
        newItem.child(pushID+'/Comentarios').set({
            Comentario:'Aqui van los comentarios'
        });
        newItem.child(pushID+'/Cuartos').set({
            Cuartos:'Aqui van cuartos'
        });
        if(this.props.picture1!="none"){
            if(!this.props.picture1.cancelled){
                this.uploadImage2fire(this.props.picture1.uri, "Pen"+pushID+"1", 1, pushID)
            }
        }
        if(this.props.picture2!="none"){
            if(!this.props.picture2.cancelled){
                this.uploadImage2fire(this.props.picture2.uri, "Pen"+pushID+"2", 2, pushID)
            }
        }
        if(this.props.picture3!="none"){
            if(!this.props.picture3.cancelled){
                this.uploadImage2fire(this.props.picture3.uri, "Pen"+pushID+"3", 3, pushID)
            }
        }
        var query = firebase.database().ref('Pensiones/');
             query.once("value")
              .then((snapshot)=> {
                var Pensiones=[];
                var find=[];
                snapshot.forEach((childSnapshot)=> {       
                    find = find.concat(childSnapshot.val());
                });
                for(var i=0; i<find.length;i=i+1){
                  var Pension=Object.values(find[i]);
                  var PensionInfo =Pension[2];

                  if(PensionInfo.bossID==currentUser.uid){
                      Pensiones=Pensiones.concat(Pension[2]);
                  }
                }
              this.props.updateDataBoss(Pensiones);
              this.props.navigation.navigate('BossStart');
            });
    }


    
    render() {
        
        return (
            // <View style={styles.container}>
            <ScrollView style={styles.neatScroll}>
                
                <View style={styles.header}>
                    <Text>Aqui puedes añadir una pension</Text>
                    <Text> Ingresa los datos que hay debajo!</Text>
                </View>
                <View style={styles.center}>
                    <Text>Ponle un nombre a tu casa!</Text>
                        <TextInput
                        style={styles.textInput}
                        onChangeText={this._onChangeAlias}/>
                    <Text>Direccion</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this._onChangeDirection}/>
                    <Text>Barrio</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this._onChangeBarrio}/>
                    <Text>Seleccione los servicios que ofrece</Text>
                    <CheckBox
                        onClick={()=>{
                            this.setState({isCheckedComida: !this.state.isCheckedComida})
                        }}
                        isChecked={this.state.isCheckedComida}
                        leftText={"Comida"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({isCheckedInternet: !this.state.isCheckedInternet})
                        }}
                        isChecked={this.state.isCheckedInternet}
                        leftText={"Internet"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({isCheckedLavado: !this.state.isCheckedLavado})
                        }}
                        isChecked={this.state.isCheckedLavado}
                        leftText={"Lavado"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({isCheckedAseo: !this.state.isCheckedAseo})
                        }}
                        isChecked={this.state.isCheckedAseo}
                        leftText={"Aseo en los cuartos"}
                    />
                    <CheckBox
                        onClick={()=>{
                            this.setState({isCheckedLlave: !this.state.isCheckedLlave})
                        }}
                        isChecked={this.state.isCheckedLlave}
                        leftText={"al cliente se le da llaves de la casa"}
                    />
                    <Text>Agregue Observaciones importantes a los servicios que ofrece</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Por ejemplo, En el servicio de la comida, no se ofrece comida los domingos ni festivos'
                        onChangeText={this._onChangeSpecifications}/>
                    <Text>Ahora, agregue reglas generales de la casa que deberia saber el cliente</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Por ejemplo, no se pueden recibir visitas sin autorizacion'
                        onChangeText={this._onChangeRules}/>
                    <Text>Listo!</Text>

                    <Button
                    title='Localiza tu pension!'
                    onPress={this._onPressLocatePension}
                    color={typeof this.props.coordinates == "object"? '#01ad1b':'#7c0a00'}
                    />
                    <Text>Agrega 3 Fotos!</Text>

                    <Text>Agregue aqui la primera imagen</Text>
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
                        onPress={this._onPressSendData}
                        />   
                </View>
                
                </ScrollView>
            //</View>
            

        );
    }
}

function mapStateToProps(state){
    const {user, pensiones, coordinates, picture1, picture2,picture3} = state;
    return{
      user,
      pensiones,
      coordinates, 
      picture1, 
      picture2,
      picture3
    };
  }
  
  function mapDispatchToProps(dispatch){
    return{
      updateData: bindActionCreators(Actions.updateData,dispatch),
      updateDataBoss: bindActionCreators(Actions.updateDataBoss, dispatch),
      uploadPicture1: bindActionCreators(Actions.picture1, dispatch),
      uploadPicture2: bindActionCreators(Actions.picture2, dispatch),
      uploadPicture3: bindActionCreators(Actions.picture3, dispatch),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddPension);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    neatScroll:{
        padding:20,
    },
    header:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'lightblue',
    },
    center:{
      justifyContent: 'center',
      flex: 3,
      padding: 10,
    },
    footer:{
      justifyContent: 'flex-end',
      flex: 0.5,
    },
    textInput:{
        borderColor: 'black',
        backgroundColor: 'grey',
        height: '5%'
      },
    contentContainer: {
        flex:1,
      }
  });