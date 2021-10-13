import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import Header from "../../components/Header";

const BrowserHome = ({ route }:{ route:any }) => {
  return(
    <View style={styles.mainView}>
      <Header headerTitle="" bottom={0}/>
      <WebView
        originWhitelist={['http://*', 'https://*', 'intent://*']}
        source={{ uri: route.params.url }}
        mixedContentMode="always"
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FFFFFF',
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default BrowserHome;
