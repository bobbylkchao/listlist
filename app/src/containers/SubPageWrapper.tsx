/**
 * SubPageWrapper Component
 * @version 1.0.0
 * @author [Bobby Chao](dev-bobby@cbrlife.com.au)
 * @desc Custom content container component, should use in every sub-page content, put all content inside it.
 * @param {object} style The extended styles of this component.
 */

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import Header from "../components/Header";

const SubPageWrapper = (props:any) => {
  return(
    <View style={styles.mainView}>
      <Header headerTitle={props.title}/>
      <ScrollView style={{ ...styles.scrollView, ...props.style }}>
        { props.children }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default SubPageWrapper;
