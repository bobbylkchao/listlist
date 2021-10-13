/**
 * DownloadImage Component
 * @version 1.0.0
 * @author [Bobby Chao](dev-bobby@cbrlife.com.au)
 * @description This function used to download a image from remote url and save to photo folder
 * @param {string} url
 * @param {function} callback , callback function, for toast call back, params: title, type(succsss/failed)
 * @return Download image or display permission alert
 */
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { photosPermissionAlert } from '../utils';

const DownloadImage = (url:any, callback: (arg:object) => void) => {

  MediaLibrary.getPermissionsAsync()
    .then((value) => {
      const status = value.status;
      const canAskAgain = value.canAskAgain;
      if(status==='granted'){
        // permission is ok, start download
        SaveImage(url);
      }else{
        if(canAskAgain){
          // can ask user to gain
          MediaLibrary.requestPermissionsAsync()
            .then((requestPermissionsAsyncResult) =>{
              if(requestPermissionsAsyncResult.status==='granted'){
                // premission granted ok, start download
                SaveImage(url);
              }else{
                // failed, user denied
                // display message, better direct user to setting page
                photosPermissionAlert();
              }
            });
        }else{
          // failed, can't ask user to gain
          // display message
          photosPermissionAlert();
        }
      }
    });

  /**
   * @name: SaveImage
   * @desc: move download image to local photo folder
   * @param {string} url
   * @return {*}
   */
  const SaveImage = (url:string) => {
    const fileExtension = url.split('.');// get file extension eg. png jpeg ...
    if(fileExtension[fileExtension.length-1]){
      const newFullyFileName = `${Date.now()}.${fileExtension[fileExtension.length-1]}`;// create a new file name
      FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + newFullyFileName,
      )
        .then(({ uri, status }) => {
          // this url protocol is file://
          // after save to local, then move file from local to photo folder
          if(status === 200){
            // status equal 200 means download successful
            MediaLibrary.createAssetAsync(uri);
            callback({
              code: 200,
              message: "图片已保存",
            });

          }else{
            callback({
              code: 500,
              message: "图片保存失败",
            });
          }
        })
        .catch(() => {
          callback({
            code: 500,
            message: "图片下载异常",
          });
        });
    }else{
      callback({
        code: 500,
        message: "图片格式错误",
      });
    }
  };
};

export { DownloadImage };
