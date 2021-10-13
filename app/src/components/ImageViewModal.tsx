/**
 * Image View Modal Component
 * @version 1.0.0
 * @author [Bobby Chao](dev-bobby@cbrlife.com.au)
 * @description Description of this component, 原始组件文档 [https://www.npmjs.com/package/react-native-image-zoom-viewer](https://www.npmjs.com/package/react-native-image-zoom-viewer)
 * @param Read the PropsInterface
 */

import React from 'react';
import { Modal, View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import ImageViewer from 'react-native-image-zoom-viewer';
import DefaultLoadingIndicator from "./DefaultLoadingIndicator";
import { DownloadImage } from "./DownloadImage";
import { showAlert } from "../utils";

const ImageViewModal = () => {
  const getReduxStoreState = useSelector((state:any) => state);
  const dispatchRedux = useDispatch();

  const hideImageViewModal = () => {
    dispatchRedux({
      type: 'hideImageViewModal',
    });
  };

  return(
    getReduxStoreState['imageViewModal_Reducer']['state']['images'] ?
    <Modal
      visible={getReduxStoreState['imageViewModal_Reducer']['state']['visible']}
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={{ backgroundColor: '#000000', height: 15 }}/>
      <ImageViewer
        imageUrls={getReduxStoreState['imageViewModal_Reducer']['state']['origin'] === 'remote' ? getReduxStoreState['imageViewModal_Reducer']['state']['images'] : [{
          url: '',
          props: {
            source: require('../../assets/img/adSwiperPlaceholder.jpeg'),
          },
        }]}
        loadingRender={DefaultLoadingIndicator}
        enableSwipeDown={true}
        swipeDownThreshold={200}
        onSwipeDown={() => hideImageViewModal()}
        onSave={e => imageViewModalDownloadImage(e)}
        menuContext={{
          saveToLocal: "保存到相册",
          cancel: "取消",
        }}
      />
    </Modal>
    : <></>
  );
};

const imageViewModalDownloadImage = (url:any) => {
  DownloadImage(url, (r:any) => {
    if(r.code === 200){
      showAlert({ title: '提示', msg: r.message });
    }else{
      showAlert({ title: '提示', msg: r.message });
    }
  });
};

export default ImageViewModal;
