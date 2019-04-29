import React from 'react';
import {View, Text} from 'react-native';

export default class ComentLoaderBoss extends React.Component{
    stackComents(){
        code=[]
        if(this.props.comentarios!=null){
            for (let index = 0; index < this.props.comentarios.length; index++) {
                code.push(
                    <View>
                    <Text>{this.props.comentarios[index].NombreUser}</Text>
                    <Text>{this.props.comentarios[index].comentario}</Text>
                    </View>
                )
            }
        }
        return code;
    }

    render(){
        return(
            <View>
                {this.stackComents()}
            </View>
        );
    }
}