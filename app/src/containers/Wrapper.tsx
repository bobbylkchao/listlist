/**
 * Wrapper Component
 * @version 1.0.0
 * @author [Bobby Chao](dev-bobby@cbrlife.com.au)
 * @desc Main wrapper container component for four tab screens: 新闻, 同城, 黄页, 我的
 * @param {boolean} showbg optional, as default will show background image, pass 'false' will hide background image.
 */

import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions, ScrollView } from "react-native";
import Constants from 'expo-constants';

const bgImage = require("../../assets/bg.png");

const Wrapper = (props:any) => (
  typeof(props.showbg) === 'undefined' || props.showbg ? <BgContainer {...props}/> : <DefaultContainer {...props}/>
);

const BgContainer = (props:any) => (
  <View style={styles.wrapper}>
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
      <ScrollView style={styles.insideView}>{ props.children }</ScrollView>
    </ImageBackground>
  </View>
);

const DefaultContainer = (props:any) => (
  <View style={styles.containerWrapper}>
    <ScrollView style={styles.insideView}>{ props.children }</ScrollView>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingLeft: 10,
    paddingRight: 10,
  },
  containerWrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  insideView: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: Constants.statusBarHeight,
  },
});

export default Wrapper;
