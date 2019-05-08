import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

//Componentes
import Field from '../components/Field';
import Button from '../components/Button';
import Load from '../components/Load';

//Fire Base
import * as firebase from 'firebase';

//Async Storage
import {onSignIn, isSignedIn} from '../components/tools/Auth';

//Redux
import {connect} from 'react-redux';
import {actionsCreator as Actions} from '../components/tools/redux/Actions';
import {bindActionCreators} from 'redux';




//Vista Login, Vista principal de la aplicacion
class LogIn extends React.Component {
    constructor(props){
        super(props);

        this.state={
          correo:'',
          contra:'',
          loading:false
        }
    }

    componentWillMount(){
      var user = {correo: '', contra: '', type: '', nombre: '', apellido: '', photoUri:''};
      this.props.updateData(user);
    }

    componentDidMount(){
      isSignedIn('Log').then((value)=>{
        this.props.updateData(value);
        if(value != 'empty'){
          this.setState({loading:true})
          firebase.auth().signInWithEmailAndPassword(value.Correo, value.Contra)
          .then(()=>{
            currentUser=firebase.auth().currentUser.uid;
            
            if (value.Type == 0) {
              var query = firebase.database().ref('Pensiones/');
              query.once("value")
                .then((snapshot) => {
                  currentUser = firebase.auth().currentUser;
                  var Pensiones = [];
                  var find = [];
                  snapshot.forEach((childSnapshot) => {
                    find = find.concat(childSnapshot.val());
                  });
                  for (var i = 0; i < find.length; i = i + 1) {
                    var Pension = Object.values(find[i]);
                    Pensiones = Pensiones.concat(Pension[2]);
                  }               
                  this.props.updateDataBoss(Pensiones);
                  this.props.navigation.navigate('ClientStart');
                });
            }else if(value.Type ==1){
              var query = firebase.database().ref('Pensiones/');
              query.once("value")
               .then((snapshot)=> {
                 currentUser = firebase.auth().currentUser;
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
               this.setState({loading:false})
               this.props.navigation.navigate('BossStart');
             });
             
            }
          }).catch((err)=>alert(err));
        }
      });
      
    }



    //Inicia sesion y determina el tipo de usuario.
    _onPressLogIn=()=>{
      firebase.auth().signInWithEmailAndPassword(this.state.correo, this.state.contra)
      .then(()=>
      {
        this.setState({loading:true})
        currentUser = firebase.auth().currentUser;
        firebase.database().ref('Users/'+currentUser.uid+'/Account-Info').once('value', (dataSnapshot)=>{
          this.props.updateData(dataSnapshot.val());
          onSignIn('Log',dataSnapshot).then().catch((err)=>alert(err));
          let type = dataSnapshot.val();
          if(type.Type== 0){
            var query = firebase.database().ref('Pensiones/');
            query.once("value")
              .then((snapshot) => {
                currentUser = firebase.auth().currentUser;
                var Pensiones = [];
                var find = [];
                snapshot.forEach((childSnapshot) => {
                  find = find.concat(childSnapshot.val());
                });
                for (var i = 0; i < find.length; i = i + 1) {
                  var Pension = Object.values(find[i]);
                  Pensiones = Pensiones.concat(Pension[2]);
                }               
                this.props.updateDataBoss(Pensiones);
                this.setState({loading:false})
                this.props.navigation.navigate('ClientStart');
              });
          }else{
            var query = firebase.database().ref('Pensiones/');
              query.once("value")
               .then((snapshot)=> {
                 currentUser = firebase.auth().currentUser;
                 var Pensiones=[];
                 var find=[];
                  snapshot.forEach((childSnapshot)=> {       
                    find = find.concat(childSnapshot.val());
                    });
                  for(var i=0; i<find.length;i=i+1){
                    var Pension=Object.values(find[i]);
                    var PensionInfo = Pension[2];
                    if(PensionInfo.bossID==currentUser.uid){
                        Pensiones=Pensiones.concat(Pension[2]);
                    }
                  }
               this.props.updateDataBoss(Pensiones);
               this.setState({loading:false})
               this.props.navigation.navigate('BossStart');
             });
          }
          
        })
      })
      .catch((err)=>alert(err));
    }

    //Redirige a la vista de registro
    _onPressRegister=()=>{
      this.props.navigation.navigate('Register')
    };

    //Actualiza el estado de correo
    _onChangeCorreo=(text)=>{
      this.setState({correo: text});
    }

    //Actualiza el estado de contra
    _onChangePass=(text)=>{
      this.setState({contra: text});
    }

    render() {
      if(this.state.loading){
        return (
          <ImageBackground 
          style={styles.style_elAlo}
          source={require('./images/LoginScreen_elAlo_199356.jpg')}
        >
          <View style={styles.loading}>
            <Load/>
          </View>
          </ImageBackground>
        );
      }else{
        return (
          <ImageBackground 
          style={styles.style_elAlo}
          source={require('./images/LoginScreen_elAlo_199356.jpg')}
        >
            <View style={styles.header}>
              {/* Aqui deberia ir el logo */}
              <Image
                style ={styles.logo}
                source={require('./Image/logo.png')}
              /> 
            </View>
  
            <View style={styles.center}>
                <View style={styles.fields}>
                  <Field placeholder='Correo' onChange={this._onChangeCorreo} pass={false}/>
                </View>
                <View style={styles.fields}>
                  <Field placeholder='Contraseña' onChange={this._onChangePass} pass={true} />
                </View>
                
            </View>
            <View style={styles.buttonEntry}>
              <Button
                title='Iniciar Sesión'
                onPress={this._onPressLogIn}
              />
            </View>
            <View style={styles.footer}>
  
                <Text
                  style = {styles.style_elRegisterLink}
                  onPress={this._onPressRegister}
                  >¿No tienes cuenta? Registrate!
                </Text>
  
            </View>
  
        </ImageBackground>
        );
      }
      
    }
}

function mapStateToProps(state){
  return {};
}

function mapDispatchToProps(dispatch){
  return{
    updateData: bindActionCreators(Actions.updateData,dispatch),
    updateDataBoss: bindActionCreators(Actions.updateDataBoss,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

const styles = StyleSheet.create({

  logo:{
    width: 240,
    height: 200,
  },
  loading:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  fields:{
    flex:1
  },
  buttonEntry:{
    flex:1,
    width: '90%',
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  center:{
    marginTop:'20%',
    width: '90%',
    flex:2.5
  },
  footer:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  style_elAlo: {
    width: '100%',
    height: '100%',
    alignItems:'center', 
    display: 'flex' 
  },
  style_elIniciaSesionClient: {
    fontSize: 16.9,
    color: 'white',
    textAlign: 'left',
  },
  style_elRectangle2: {
    backgroundColor: '#f6f6f6'
  },
  style_elIniciaSesionDueno: {
    fontSize: 16.9,
    color: 'white',
    textAlign: 'left',
  },
  style_elRectangle3: {
    marginBottom:  '20px',
  },
  style_elNotLogo: {
    width: '100%',
    height: '100%'
  },
  style_elPenQApp: {
    fontSize: 42.2,
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  style_elRegisterLink: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight:'bold'
  },
  LogInButton:{
    marginTop: '10px',
    backgroundColor: '#7b68ee'
  }
});
