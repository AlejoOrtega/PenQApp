import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import ImagesSwiper from "react-native-image-swiper";



export default class SwiperC extends Component {
  
  _loadSwiper(){
    code=[]
    code.push(
    <ImagesSwiper 
      images={this.props.pictures}/>)
    return code;
  }
  
  render(){
    return (
      <View>
        {this._loadSwiper()}
      </View>
      
    );
  }
}