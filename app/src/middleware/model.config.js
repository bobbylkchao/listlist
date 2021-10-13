/**
 * 数据Model配置
 * @desc 前端MVC分离, 数据的Model单独在这个文件中配置
 * @param {string} tableName 对应本地数据库中的表名
 * @param {string} create model对应的表的创建SQL
 * @param {number} dataExpirationTime 数据表中数据过期时间设置, 毫秒. eg. 3600 就是1小时
 * @param {string} remoteAPIMethod 远程API数据请求方式. eg. POST, GET, PUT ...
 * @param {string} remoteAPI 远程全量数据API地址
 * @param {string} remoteAPILatest 远程增量数据API地址
 * @param {string} remoteAPILoadmore 远程更多数据API地址
 * @param {string} remoteAPIAdd 远程创建数据API地址
 * @param {string} remoteAPIUpdate 远程更新数据API地址
 * @param {string} remoteAPIDelete 远程删除数据API地址
 * @param {void} dataMerge 定义新老数据如何合并, 如果这个model不需要用到数据合并, 那么这个方法可以不用写
 *    @param {object} originalData 老数据
 *    @param {object} newData 新数据
 *    @param {string} driection 合并方向, bottom 代表将新的数据追加至老数据尾部, top 代表将新的数据插入至老数据头部
 * @param {void} remainingDataCheck 剩余数据检查的方式定义
 *    @param {object} arr 数据源
 *    @param {object} params 参数
 * @param {void} getMoreLocalData 获取更多本地数据的方式定义
 *    @param {object} arr 数据源
 *    @param {number} fromIndex 从哪一个index开始获取剩余数据
 */

import { getArrayIndex } from '../utils';

export const appGlobalTablesConfig = [
  {
    tableName: "weatherandrating",
    create: `
      CREATE TABLE IF NOT EXISTS "weatherandrating"(
        "id"	INTEGER NOT NULL,
        "content"	TEXT NOT NULL,
        "timestamp"	DATETIME DEFAULT (datetime('now','localtime')),
        PRIMARY KEY("id" AUTOINCREMENT)
      );
    `,
    dataExpirationTime: 43200,// 12小时
    remoteAPIMethod: "POST",
    remoteAPI: "https://api.canberraport.com/public/getWeatherExchange",
    remoteAPILatest: "https://api.canberraport.com/public/getWeatherExchange",
    remoteAPILoadmore: "https://api.canberraport.com/public/getWeatherExchange",
  },
  {
    tableName: "localpost",
    create: `
      CREATE TABLE IF NOT EXISTS "localpost"(
        "id"	INTEGER NOT NULL,
        "content"	TEXT NOT NULL,
        "timestamp"	DATETIME DEFAULT (datetime('now','localtime')),
        PRIMARY KEY("id" AUTOINCREMENT)
      );
    `,
    dataExpirationTime: 300,// 5分钟
    remoteAPIMethod: "POST",
    remoteAPI: "https://api.canberraport.com/v2/local/api/GetLocalFullList",
    remoteAPILatest: "https://api.canberraport.com/v2/local/api/GetLocalIncrementalList",
    remoteAPILoadmore: "https://api.canberraport.com/v2/local/api/GetLocalMoreList",
    remoteAPIAdd: "",
    remoteAPIUpdate: "",
    remoteAPIDelete: "",
    dataMerge: (originalData, newData, direction) => {
      let newArray = {
        code: 200,
        message: [],
        car_infos: [],
        images: [],
        pinche_infos: [],
        zufang_infos: [],
      };

      if(direction === 'bottom'){
        // 合并至底部
        newArray.message = originalData.message.concat(newData.message);
        newArray.car_infos = originalData.car_infos.concat(newData.car_infos);
        newArray.images = originalData.images.concat(newData.images);
        newArray.pinche_infos = originalData.pinche_infos.concat(newData.pinche_infos);
        newArray.zufang_infos = originalData.zufang_infos.concat(newData.zufang_infos);
      }else if(direction === 'top'){
        // 合并至顶部
        newArray.message = newData.message.concat(originalData.message);
        newArray.car_infos = newData.car_infos.concat(originalData.car_infos);
        newArray.images = newData.images.concat(originalData.images);
        newArray.pinche_infos = newData.pinche_infos.concat(originalData.pinche_infos);
        newArray.zufang_infos = newData.zufang_infos.concat(originalData.zufang_infos);
      }
      return newArray;
    },
    remainingDataCheck: (arr, params) => {
      const nowIndex = getArrayIndex(arr.message, parseInt(params.fromID ? params.fromID : 0));
      const arrayLastIndex = arr.message.length-1;
      const remainDataLength = parseInt(arr.message.length)-(parseInt(nowIndex)+1);
      return {
        currentLastIDIndex: nowIndex,// 当前fromID所在的index
        wholeArrayLastIndex: arrayLastIndex,// 本地数据最后一位的index
        remainDataLength: remainDataLength,// 剩余本地数据长度
      };
    },
    getMoreLocalData: (arr, fromIndex) => {
      if(arr.message){
        arr.message = arr.message.slice(fromIndex, fromIndex+10);
        return arr;
      }else{
        return [];
      }
    },
  },
  {
    tableName: "adSwiper",
    create: `
      CREATE TABLE IF NOT EXISTS "adSwiper"(
        "id"	INTEGER NOT NULL,
        "content"	TEXT NOT NULL,
        "timestamp"	DATETIME DEFAULT (datetime('now','localtime')),
        PRIMARY KEY("id" AUTOINCREMENT)
      );
    `,
    dataExpirationTime: 3600,// 1小时
    remoteAPIMethod: "POST",
    remoteAPI: "https://api.canberraport.com/Ads/getAd/Get",
  },
  {
    tableName: "newsCategory",
    create: `
      CREATE TABLE IF NOT EXISTS "newsCategory"(
        "id"	INTEGER NOT NULL,
        "content"	TEXT NOT NULL,
        "timestamp"	DATETIME DEFAULT (datetime('now','localtime')),
        PRIMARY KEY("id" AUTOINCREMENT)
      );
    `,
    dataExpirationTime: 604800,// 7天
    remoteAPIMethod: "POST",
    remoteAPI: "https://api.canberraport.com/News/NewsCategory/Get",
  },
];