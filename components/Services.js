import React from 'react';
import { View, Alert, Text } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


export default class Services extends React.Component {
  constructor(props){
      super(props);
  }

  stackServices(){
    code=[]
    if(this.props.data.Comida){
      code.push(<Text>Comida</Text>)
    }
    if(this.props.data.Aseo){
      code.push(<Text>Aseo</Text>)
    }
    if(this.props.data.Internet){
      code.push(<Text>Internet</Text>)
    }
    if(this.props.data.Llaves){
      code.push(<Text>Llaves de la Casa</Text>)
    }
    if(this.props.data.Lavado){
      code.push(<Text>Lavado de Ropa</Text>)
    }
    return code;
  }
    render() {
    return (
      <View>
        {this.stackServices()}
      </View>

    );
  }
}
