import React from 'React'
import {View, TouchableHighlight, Text, Image} from "react-native"
import {ImagePicker, Permissions} from 'expo';

export default class PictureLoader extends React.Component{
    constructor(props){
        
    }

    _load(){
        code=[]
        if(this.props.data == "none"){
            code.push(
                <Image
                style={{width: 100, height:100}}
                source={require("../screens/Image/addPhoto.png")}/>
            )
        }else{
            code.push(
                <Image
                style={{width: 100, height:100}}
                source={this.props.data}/>
            )
        }
        return code;
    }

    _selectImage= async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync();
        this.props.onChange(result);
        this.forceUpdate()
    }

    render(){
        return(
            <View>
                <TouchableHighlight
                onPress={this._selectImage()}>
                    {this._load()}
                </TouchableHighlight>
            </View>
        );
    }
}