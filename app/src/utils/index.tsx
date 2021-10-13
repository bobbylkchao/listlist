/**
 * 公共可复用函数
 */
import Toast from 'react-native-tiny-toast';
import * as Updates from 'expo-updates';
import { Alert, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as WebBrowser from 'expo-web-browser';
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';
import NetInfo from '@react-native-community/netinfo';
import * as Network from 'expo-network';
import {
  ToastPropsInterface,
  AlerPropsInterface,
  OpenScreenInterface,
  ShareInterface,
  SendSMSInterface,
  MakeCallInterface,
} from './interfaces';
import { appGlobalConfig } from '../../config/app.global.config';

// ajax请求封装
const request = {
  post: (apiURL: string, params: {}, callback: any) => {
    fetch(apiURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    .then(res => res.json())
    .then(res => callback(res));
  },
  get: (apiURL: string, callback: any) => {
    fetch(apiURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => callback(res));
  },
};

// 页面跳转
const openscreen = (props: OpenScreenInterface) => {
  if(props.screenName){
    props.navigation.navigate(
      props.screenName,
      props.params ? props.params : {},
    );
  }
};

// Toast
const showToast = (props: ToastPropsInterface) => {
  let toastImage;

  if(typeof(props.showIcon) === 'undefined' || props.showIcon === null){
    props.showIcon = true;// 默认显示icon
  }

  if(props.showIcon){
    if(props.type){
      if(props.type === 'success'){
        toastImage = require('../../assets/icon_success.png');
      }else if(props.type === 'failed'){
        toastImage = require('../../assets/icon_error.png');
      }else if(props.type === 'warning'){
        toastImage = require('../../assets/icon_warning.png');
      }
    }else{
      toastImage = require('../../assets/icon_success.png');
    }
  }else{
    toastImage = null;
  }

  Toast.hide('');

  Toast.show(props.message, {
    duration: props.time ? props.time : 1000,
    position: 0,
    containerStyle: {
      minWidth: 105,
      minHeight: 105,
      backgroundColor: 'rgba(30,30,30,.85)',
    },
    imgStyle: {
      width: 45,
      height: 45,
    },
    textStyle: {
      marginTop: 10,
    },
    imgSource: toastImage,
  });
};

// 重启App
const restartApp = () => {
  Updates.reloadAsync();
};

// 剪贴板: 设置
const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
};

// 剪贴板: 读取
const readFromClipboard = async (callback: (text: string) => void) => {
  callback(await Clipboard.getStringAsync());
};

// 自定义Alert
const showAlert = (props: AlerPropsInterface) => {
  Alert.alert(
    props.title ? props.title : '提示',
    props.msg,
    [
      {
        text: props.okBtnText ? props.okBtnText : '好的',
        style: "cancel",
      },
    ],
    {
      cancelable: false,
    },
  );
};

// 相册权限提示
const photosPermissionAlert = () => {
  Alert.alert(
    '相册权限',
    '保存图片需要相册权限',
    [
      {
        text: '取消',
        style: "cancel",
      },
      {
        text: '允许',
        onPress: () => {
          openSettings();
        },
      },
    ],
    { cancelable: false },
  );
};

// 打开内置浏览器
const openMobileBrowser = (url:string) => {
  WebBrowser.openBrowserAsync(url);
};

// 原生分享 TODO: [CAR-60] 完善分享的Icon
const nativeShare = async (props: ShareInterface) => {
  try {
    const result = await Share.share({
      message: props.message,
      url: props.url,
      title: props.title ? props.title : 'CBRLife堪生活',
    });
    // 分享触发后的行为及结果不追踪, 但是if条件暂时放在这, 暂时不要删除
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    showAlert({ msg: "分享失败\n请重试" });
  }
};

/**
 * Show Image View Modal 图片全屏浏览
 * @param {void} dispatch MUST PASS dispatch param by using `import { useDispatch } from "react-redux"; const dispatch = useDispatch();`
 * @param {array} images eg. `[{url: '1.png'},{url: '2.png'}]`
 * @Usage:
  ```ts
    import React from "react";
    import { useDispatch } from "react-redux";
    import { showImageViewModal } from "utils";

    const showModal = () => {
      const dispatch = useDispatch();
      showImageViewModal(dispatch, [
      {url: 'https://app-upload.canberraport.com/user_post//UploadPublishImg20210806/211518_93261_1628230633g.jpg'},
      {url: 'https://app-upload.canberraport.com/user_post//UploadPublishImg20210806/211518_54342_1628230634g.jpg'},
      ]);
    };
  ```
*/
const showImageViewModal = (dispatch:(params: object) => void, images:{url: string}[], imageOrigin: string) => {
  dispatch({
    type: 'showImageViewModal',
    value: images,
    imageOrigin: imageOrigin,
  });
};

// 编辑短信
const sendSMS = async (props: SendSMSInterface) => {
  await SMS.sendSMSAsync(
    props.number ? props.number : ' ',
    props.content,
  );
};

// 拨打电话
const makeCall = (props: MakeCallInterface) => {
  Linking.openURL(`tel://${props.number}`);
};

// 打开App设置 Link
const openSettings = () => {
  Linking.openSettings();
};

/**
 * 订阅设备网络状态
 * @doc https://docs.expo.dev/versions/latest/sdk/netinfo/
*/
const subscribeNetState = () => {
  debugLog(`[DEBUG][订阅]已订阅网络状态监听`);
  let lastState = true;
  NetInfo.addEventListener((state) => {
    if(!state.isConnected){
      showToast({ message: '您的网络已断开', type: 'warning', showIcon: false, time: 2000 });
      lastState = false;
    }else{
      if(!lastState){
        showToast({ message: '您的网络已恢复', type: 'success', time: 2000 });
      }
      lastState = true;
    }
  });
};

// 获取设备网络状态
const getNetState = async (callback:(result:boolean|unknown) => void) => {
  const result = await Network.getNetworkStateAsync();
  callback(result.isConnected);
};

// 获取某个值在数组的index位置
const getArrayIndex = (arr: [] | any, item: string | number) => {
  let result: number | string = -1;
  for(const i in arr){
    // console.log(`index: ${i} , id: ${arr[i].id}`);
    if(arr[i].id === item){
      result = i;
    }
  }
  return result;
};

// DEBUG日志
const debugLog = (log: string) => {
  appGlobalConfig.DEBUG_MODE ? console.log(log) : null;
};

export {
  openscreen,
  showToast,
  restartApp,
  copyToClipboard,
  readFromClipboard,
  showAlert,
  photosPermissionAlert,
  openMobileBrowser,
  nativeShare,
  showImageViewModal,
  sendSMS,
  makeCall,
  openSettings,
  request,
  subscribeNetState,
  getNetState,
  getArrayIndex,
  debugLog,
};
