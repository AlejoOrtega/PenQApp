import React from 'react'
import {View,ActivityIndicator} from 'react-native'

export default class Load extends React.Component{
    render(){
        return(
            <View>
                <ActivityIndicator size={120} color="#0000ff" />
            </View>
        );
    }
}
