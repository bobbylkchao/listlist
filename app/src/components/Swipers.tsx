/**
 * Swiper Component
 * @version 1.0.0
 * @author [Bobby Chao](dev-bobby@cbrlife.com.au)
 * @description Description of this component
 * @param Read the PropsInterface
 */

import React from "react";
import { View, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Swiper from 'react-native-swiper';
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { showImageViewModal, openscreen, openMobileBrowser, copyToClipboard, showToast } from "../utils";

interface PropsInterface{
  /**
   * 高度
   * @default 130 px
   */
  height?: number;
  /**
   * 是否是横向滚动
   * @default true ,如果为false, 则为垂直滚动
   */
  horizontal?: boolean;
  /**
   * 轮播内容
   */
  items: {
    imageURL: string; // 轮播图片地址
    eventType: string; // 点击事件 'showImages' | 'toScreen' | 'browser' | 'clipboard'
    /**
     * 点击事件明细
     * showImages的eventDetails为: {url: string}[]
     * toScreen和browser的eventDetails为: {screenName: string, screenParams: {}}
     * clipboard的eventDetails为: {text: string, toastMsg: string}
     */
    eventDetails: any;
  }[];
}

const Swipers:React.FC<PropsInterface> = (props) => {
  const dispatchRedux = useDispatch();
  const navigation = useNavigation();

  const pressEventBinding = (eventType: string, eventDetails: any) => {
    switch(eventType){
      // 显示全屏图片浏览
      case 'showImages':
        bindShowImages(eventDetails);
        break;
      // 页面跳转
      case 'toScreen':
        bindToScreen(eventDetails);
        break;
      // 打开内置浏览器访问外链
      case 'browser':
        bindOpenBrowser(eventDetails);
        break;
      // 调用剪贴板复制信息
      case 'clipboard':
        bindCopyToClipboard(eventDetails);
        break;
      default:
        break;
    }
  };

  // 事件绑定: 显示全屏图片浏览
  const bindShowImages = (eventDetails:{url: string}[]) => {
    showImageViewModal(dispatchRedux, eventDetails, props.items[0].imageURL === 'string' ? 'remote' : 'local');
  };

  // 事件绑定: 页面跳转
  const bindToScreen = (eventDetails:{screenName: any, screenParams: {}}) => {
    openscreen({
      navigation: navigation,
      screenName: eventDetails.screenName,
      params: eventDetails.screenParams,
    });
  };

  // 事件绑定: 复制到剪贴板
  const bindCopyToClipboard = (eventDetails:{text: string, toastMsg: string}) => {
    copyToClipboard(eventDetails.text);
    showToast({ message:eventDetails.toastMsg, time: 500 });
  };

  // 事件绑定: 打开外链
  const bindOpenBrowser = (eventDetails:{url: string}) => {
    openMobileBrowser(eventDetails.url);
  };

  return(
    <Swiper
      horizontal={typeof(props.horizontal)==='undefined' ? true : props.horizontal}
      showsPagination={false}
      containerStyle={{
        ...styles.container,
        ...{ height: props.height ? props.height : 130 },
      }}
      autoplay={true}
      autoplayTimeout={5}
      loop={true}
      index={0}
      bounces={true}
      >

      {
        props.items.map((item:any, key:number) => (
          <TouchableWithoutFeedback key={key} onPress={() => pressEventBinding(item.eventType, item.eventDetails)}>
            <View style={styles.slide}>
              {
                typeof(item.imageURL) === 'string' ? <Image source={{ uri: item.imageURL }} style={styles.slideImage}/> : <Image source={item.imageURL} style={styles.slideImage}/>
              }
            </View>
          </TouchableWithoutFeedback>
        ))
      }

    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#0000',
    borderColor: '#0000003e',
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'stretch',
  },
});

export default Swipers;
