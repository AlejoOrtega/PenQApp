import React from 'react'
import {View,Image} from 'react-native';

export default class ProfilePhoto extends React.Component{  
    _getImage(){
      if(this.props.uri=="none"){
        return require("../screens/Image/noPhoto.png")
      }else{
        return {uri: this.props.uri}
      }
    }
    _pushCode(){
        code=[]
        code.push(
        <Image
        style={{width: 100, height:100, borderRadius: 100/2}}
        source={this._getImage()}/>
        )
        return code;
    }
    render(){
        return(
            <View>
                {this._pushCode()}
            </View>
        );
    }
}