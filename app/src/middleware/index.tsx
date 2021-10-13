/**
 * Data Model Middleware
 * @version 1.0.0
 * @author [Bobby Chao](dev-bobby@cbrlife.com.au)
 * @description All requests in the app are taken care of by this middleware, which will automatically switch between the local SQLite storage and the remote database
 */
import * as Network from 'expo-network';
import { request, debugLog } from "../utils";
import { appGlobalTablesConfig } from "./model.config";
import { dbTransaction, dbCheckTable, dbRebuildAllTables, dbShowTables } from "./database";
import {
  MiddlewareGetFullDataInterface,
  MiddlewareReturnInterface,
  MiddlewareGetIncrementalDataInterface,
  MiddlewareGetMoreDataInterface,
} from "./interfaces";

/**
 * middlewareGetFullData
 * @desc 获取全量数据
 * @return {object}
 */
const middlewareGetFullData = async (props: MiddlewareGetFullDataInterface, callback?: (result: MiddlewareReturnInterface) => void) => {
  debugLog(`------------`);
  debugLog(`[DEBUG][中间件]开始处理${props.tableName}的获取全量数据请求`);

  if(!props.params){
    props.params = {};
  }

  debugLog(`[DEBUG][中间件]${props.tableName} 参数: ${JSON.stringify(props.params)}`);

  if(!props.tableName){
    return callback ? callback({ code: 500, message: 'tableName can not be null' }) : null;
  }

  // 检查这张表是否存在, 将尝试创建1次
  const tableExistCheck = await middlewareCheckTableExist(props.tableName);
  if(!tableExistCheck){
    return callback ? callback({ code: 500, message: `table: ${props.tableName} is not exist` }) : null;
  }

  // 检查表有无在model中配置
  const tableConfig : any = getTableConfig(props.tableName);
  if(!tableConfig){
    return callback ? callback({ code: 500, message: 'table is not configured in model.config.js' }) : null;
  }

  // 获取网络情况
  const networkState = await Network.getNetworkStateAsync();
  const networkStateResult = networkState.isConnected;

  if(!networkStateResult){
    debugLog(`[DEBUG][中间件]断网状态`);
  }

  if(!networkStateResult && props.bypass){
    debugLog(`[DEBUG][中间件]断网, bypass自动切换为强制走本地`);
    props.bypass = false;
  }

  // 判断是否绕过本地直接获取远程
  // 绕过本地, 直接获取远程数据
  if(props.bypass){
    debugLog(`[DEBUG][中间件]${props.tableName} 绕过本地直接获取远程数据`);

    if(!tableConfig.remoteAPI){
      return callback ? callback({ code: 500, message: 'table remoteAPI is not configured in model.config.js' }) : null;
    }

    const remoteData = await middlewareGetRemoteData(tableConfig.remoteAPI, props.tableName, props.params ? props.params : {});

    if(parseInt(remoteData.code) === 200){
      // 如果返回的code是200, 则更新数据到本地
      debugLog(`[DEBUG][中间件]${props.tableName} 更新对应本地数据表(update)`);
      middlewareUpdateLocalData(props.tableName, remoteData, () => {
        return callback ? callback({ code: 200, message: remoteData }) : null;
      });
    }else{
      // 如果返回的code不是200, 则提示错误
      return callback ? callback({ code: 500, message: remoteData.message }) : null;
    }

  }

  // 不绕过本地
  if(!props.bypass){
    // 检测本地有无
    const localDataStatus = await middlewareCheckLocalTableData(props.tableName);

    // 本地有数据
    if(localDataStatus){
      debugLog(`[DEBUG][中间件]${props.tableName} 本地有数据,使用本地数据`);
      const getLocalData: any = await middlewareGetLocalData(props.tableName);
      return callback ? callback({ code: 200, message: getLocalData }) : null;
    }

    // 本地无数据

    // 判断网络情况, 如果断网, 则返回报错
    if(!networkStateResult){
      debugLog(`[DEBUG][中间件]${props.tableName} 断网, 本地无数据, 无法完成请求远程`);
      return callback ? callback({ code: 500, message: 'network offline' }) : null;
    }

    if(!localDataStatus){
      // 获取远程数据
      debugLog(`[DEBUG][中间件]${props.tableName} 本地没有数据,请求远程`);

      if(!tableConfig.remoteAPI){
        return callback ? callback({ code: 500, message: 'table remoteAPI is not configured in model.config.js' }) : null;
      }

      const remoteData = await middlewareGetRemoteData(tableConfig.remoteAPI, props.tableName, props.params ? props.params : {});

      if(parseInt(remoteData.code) === 200){
        // 如果返回的code是200, 则更新数据到本地
        debugLog(`[DEBUG][中间件]${props.tableName} 写入数据到本地数据表`);
        middlewareUpdateLocalData(props.tableName, remoteData, () => {
          return callback ? callback({ code: 200, message: remoteData }) : null;
        });
      }else{
        // 如果返回的code不是200, 则提示错误
        return callback ? callback({ code: 500, message: remoteData.message }) : null;
      }

    }
  }// !props.bypass的if结束

};

/**
 * middlewareGetIncrementalData
 * @desc 获取增量数据
 * @return {object}
 */
const middlewareGetIncrementalData = async (props: MiddlewareGetIncrementalDataInterface, callback?: (result: MiddlewareReturnInterface) => void) => {
  debugLog(`------------`);
  debugLog(`[DEBUG][中间件]开始处理${props.tableName}的获取增量数据请求`);

  if(!props.params){
    props.params = {};
  }

  debugLog(`[DEBUG][中间件]${props.tableName} 参数: ${JSON.stringify(props.params)}`);

  if(!props.tableName){
    return callback ? callback({ code: 500, message: 'tableName can not be null' }) : null;
  }

  // 检查这张表是否存在, 将尝试创建1次
  const tableExistCheck = await middlewareCheckTableExist(props.tableName);
  if(!tableExistCheck){
    return callback ? callback({ code: 500, message: 'table is not exist' }) : null;
  }

  // 检查表有无在model中配置
  const tableConfig : any = getTableConfig(props.tableName);
  if(!tableConfig){
    return callback ? callback({ code: 500, message: 'table is not configured in model.config.js' }) : null;
  }

  // 远程请求
  if(!tableConfig.remoteAPILatest){
    return callback ? callback({ code: 500, message: 'table remoteAPILatest is not configured in model.config.js' }) : null;
  }

  // 获取网络情况
  const networkState = await Network.getNetworkStateAsync();
  const networkStateResult = networkState.isConnected;
  if(!networkStateResult){
    return callback ? callback({ code: 500, message: 'network offline' }) : null;
  }

  const remoteData = await middlewareGetRemoteData(tableConfig.remoteAPILatest, props.tableName, props.params ? props.params : {});
  if(parseInt(remoteData.code) === 200){
    // 如果返回的code是200, 则更新数据到本地
    debugLog(`[DEBUG][中间件]${props.tableName} 合并数据至本地数据表`);
    await middlewareMergeLocalData(props.tableName, remoteData, 'top');
    return callback ? callback({ code: 200, message: remoteData }) : null;
  }

  if(parseInt(remoteData.code) !== 200){
    // 如果返回的code不是200, 则提示错误
    return callback ? callback({ code: 500, message: remoteData.message }) : null;
  }
};

/**
 * middlewareGetMoreData
 * @desc 获取更多数据
 * @return {object}
 */
const middlewareGetMoreData = async (props: MiddlewareGetMoreDataInterface, callback?: (result: MiddlewareReturnInterface) => void) => {
  debugLog(`------------`);
  debugLog(`[DEBUG][中间件]开始处理${props.tableName}的获取更多数据请求`);

  if(!props.params){
    props.params = {};
  }

  debugLog(`[DEBUG][中间件]${props.tableName} 参数: ${JSON.stringify(props.params)}`);

  if(!props.tableName){
    return callback ? callback({ code: 500, message: 'tableName can not be null' }) : null;
  }

  // 检查这张表是否存在, 将尝试创建1次
  const tableExistCheck = await middlewareCheckTableExist(props.tableName);
  if(!tableExistCheck){
    return callback ? callback({ code: 500, message: 'table is not exist' }) : null;
  }

  // 检查表有无在model中配置
  const tableConfig : any = getTableConfig(props.tableName);
  if(!tableConfig){
    return callback ? callback({ code: 500, message: 'table is not configured in model.config.js' }) : null;
  }

  // 远程请求
  if(!tableConfig.remoteAPILoadmore){
    return callback ? callback({ code: 500, message: 'table remoteAPILoadmore is not configured in model.config.js' }) : null;
  }

  // 检测本地有无数据
  const localDataStatus = await middlewareCheckLocalTableData(props.tableName);

  if(!localDataStatus){
    debugLog(`[DEBUG][中间件]${props.tableName} 本地无数据`);
    return callback ? callback({ code: 500, message: 'no data locally' }) : null;
  }

  // 先检查本地数据是否已经完全取完
  const getLocalData: any = await middlewareGetLocalData(props.tableName);
  const remainingDataCheck = tableConfig.remainingDataCheck(getLocalData, props.params);
  debugLog(`[DEBUG][中间件]${props.tableName} 本地数据剩余情况: ${JSON.stringify(remainingDataCheck.remainDataLength)}`);

  if(remainingDataCheck.remainDataLength > 0){
    // 如果本地还有数据, 那么继续返回
    // 从目前的最后一位的下一位开始获取, 取50个数据
    // 根据同城、论坛、活动分别取
    debugLog(`[DEBUG][中间件]${props.tableName} 本地还有数据, 直接从本地获取数据`);
    const remainDataRsl = tableConfig.getMoreLocalData(getLocalData, (parseInt(remainingDataCheck.currentLastIDIndex)+1));// 从下一位开始获取
    return callback ? callback({ code: 200, message: remainDataRsl }) : null;
  }

  if(remainingDataCheck.remainDataLength === 0){
    // 如果本地已无数据, 那么请求远程, 并追加sync至本地
    debugLog(`[DEBUG][中间件]${props.tableName} 本地已无数据, 请求远程获取更多新数据`);

    const remoteData = await middlewareGetRemoteData(tableConfig.remoteAPILoadmore, props.tableName, props.params ? props.params : {});

    if(parseInt(remoteData.code) === 200){
      // 如果返回的code是200, 则更新数据到本地
      debugLog(`[DEBUG][中间件]${props.tableName} 合并数据至本地数据表`);
      await middlewareMergeLocalData(props.tableName, remoteData, 'bottom');
      return callback ? callback({ code: 200, message: remoteData }) : null;
    }

    // 如果返回的code不是200, 则提示错误
    if(parseInt(remoteData.code) !== 200){
      return callback ? callback({ code: 500, message: remoteData.message }) : null;
    }
  }

};

/**
 * middlewareMaintainLocalData
 * @desc 定时任务（初始化时检查）, 用于维护数据表, 确保每张表content中最多只保留200行数据
 */
const middlewareMaintainLocalData = async () => {
  debugLog(`[DEBUG][中间件]定时任务-数据表维护任务开始...`);
  appGlobalTablesConfig.map((item) => {
    // item.tableName;
    if(item.hasOwnProperty("tableMaintain")){
      // 有自己的维护方法
      debugLog(`[DEBUG][中间件]定时任务-数据表维护任务-表:${item.tableName}, 使用表自己的维护方法`);
    }else{
      // 使用默认的维护方法
      debugLog(`[DEBUG][中间件]定时任务-数据表维护任务-表:${item.tableName}, 使用默认维护方法`);
      middlewareMaintainLocalDataDefaultFunction(item.tableName);
    }
  });
  debugLog(`[DEBUG][中间件]定时任务-数据表维护任务结束...`);
};

/**
 * middlewareMaintainLocalDataDefaultFunction
 * @desc 维护数据表的默认方法
 */
const middlewareMaintainLocalDataDefaultFunction = async (tableName: string) => {
  const localData: any = await middlewareGetLocalData(tableName);
  if(localData.message && localData.message.length && localData.message.length > 200){
    localData.message = localData.message.slice(0, 200);
    const contentJSON : string = JSON.stringify(localData);
    dbTransaction(`UPDATE ${tableName} SET content = ?`, [contentJSON], (flag, result) => {
      debugLog(`[DEBUG][中间件]定时任务-数据表维护任务-表:${tableName} 维护完毕, 结果: ${flag ? '成功' : '失败'}`);
    });
  }else{
    debugLog(`[DEBUG][中间件]定时任务-数据表维护任务-表:${tableName} 维护完毕, 结果: 没有长度或小于200行, 跳过`);
  }
};

/**
 * middlewareCheckTableExist
 * @desc 检查表是否存在, 如果不存在, 则会尝试创建
 */
const middlewareCheckTableExist = (tableName: string) => {
  return new Promise((resolve) => {
    dbCheckTable(tableName, (r) => {
      if(!r){
        // 如果不存在, 则尝试重建
        dbRebuildAllTables(() => {
          // 重建完毕后, 再次检查
          dbCheckTable(tableName, (r) => {
            if(!r){
              resolve(false);
            }else{
              resolve(true);
            }
          });
        });
      }else{
        resolve(true);
      }
    });
  });
};

/**
 * middlewareCheckLocalTableData
 * @desc 检查本地数据表是否有数据存在
 * @param {string} tableName 表名称
 * @param {void} callback 回调
 * @return {boolean} true 代表有数据, false 代表无数据
 */
const middlewareCheckLocalTableData = (tableName: string) => {
  return new Promise((resolve) => {
    dbTransaction(`SELECT COUNT(*) as c FROM ${tableName}`, [], (status, result) => {
      if(status){
        result.rows._array[0].c > 0 ? resolve(true) : resolve(false);
      }else{
        resolve(false);
      }
    });
  });
};

/**
 * middlewareCheckDataExpired
 * @desc 检查数据库中的数据是否过期
 * @param {string} tableName 表名称
 * @return {boolean} true代表过期了 false代表没过期
 */
const middlewareCheckDataExpired = async (tableName: string) => {
  return new Promise((resolve) => {
    (async() => {
      const dataCheck = await middlewareCheckLocalTableData(tableName);
      if(!dataCheck){
        resolve(true);
      }else{
        dbTransaction(`SELECT round((julianday('now', 'localtime')-julianday(timestamp))*86400, 2) as timeDiff FROM ${tableName};`, [], (flag, result) => {
          const tableConfig: any = getTableConfig(tableName);
          const diff = result.rows._array[0].timeDiff ? parseInt(result.rows._array[0].timeDiff) : 0;
          if(diff >= (tableConfig.dataExpirationTime ? tableConfig.dataExpirationTime : 300)){
            resolve(true);
          }else{
            resolve(false);
          }
        });
      }
    })();
  });
};

/**
 * middlewareGetRemoteData
 * @desc 获取远程数据
 * @param tableName
 * @param tableConfig
 * @returns {object}
 */
const middlewareGetRemoteData = (apiURL: string, tableName: string, params: {}) => {
  return new Promise<object|any>((resolve) => {
    getRemoteData(apiURL, tableName, params, (result) => {
      resolve(result);
    });
  });
};

/**
 * middlewareGetLocalData
 * @desc 获取本地数据库数据
 * @param {string} tableName 表名
 * @return {object}
 */
const middlewareGetLocalData = (tableName: string) => {
  return new Promise((resolve) => {
    dbTransaction(`SELECT content FROM ${tableName}`, [], (flag, result) => {
      debugLog(`[DEBUG][中间件]获取本地数据库数据, 表: ${tableName}`);
      if(result.rows._array && result.rows._array.length > 0){
        resolve(JSON.parse(result.rows._array[0].content));
      }else{
        resolve({ code: 200, message: {} });
      }
    });
  });
};

/**
 * middlewareUpdateLocalData
 * @desc 更新本地数据表数据
 * @param {string} tableName 表名称
 * @param {any} content 内容
 * @param {void} callback (optional) 回调
 */
const middlewareUpdateLocalData = async (tableName: string, content: any | object, callback?: () => void) => {

  if(!content){
    debugLog(`[DEBUG][中间件]${tableName} 本地数据 未更新 因为更新的内容为空`);
    return callback ? callback() : null;
  }

  const contentJSON : string = JSON.stringify(content);
  debugLog(`[DEBUG][中间件]${tableName} 本地数据开始更新或者插入`);
  // 判断有无数据
  const result = await middlewareCheckLocalTableData(tableName);
  if(result){
    // 有数据, 则update
    dbTransaction(`UPDATE ${tableName} SET content = ?, timestamp = datetime('now','localtime')`, [contentJSON], (flag, result) => {
      debugLog(`[DEBUG][中间件]${tableName} 本地数据 更新 ${flag ? '成功' : '失败'}`);
      callback ? callback() : null;
    });
  }else{
    // 没有数据, 则insert
    dbTransaction(`INSERT INTO ${tableName} (content) VALUES (?)`, [contentJSON], (flag, result) => {
      debugLog(`[DEBUG][中间件]${tableName} 本地数据 插入 ${flag ? '成功' : '失败'}`);
      callback ? callback() : null;
    });
  }
};

/**
 * middlewareMergeLocalData
 * @desc 合并远程获取到的数据和本地数据库的数据
 * @param apiURL
 * @param {string} tableName 表名
 * @param {object} data 新的数据
 * @param {string} direction 合并方向, top 代表合并到顶部, bottom 代表合并到底部
 * @returns {boolean}
 */
const middlewareMergeLocalData = async (tableName: string, data: object, direction: string) => {
  return new Promise((resolve) => {
    (async() => {
      // 取出表配置中的dataMerge()方法
      const tableConfig: any = getTableConfig(tableName);
      // 先取出本地数据, 取的是content字段内容
      const localData: any = await middlewareGetLocalData(tableName);
      // 然后根据合并方向, 合并2个数组
      const newData = tableConfig.dataMerge(localData, data, direction);
      // 将合并后的数组更新至数据库
      middlewareUpdateLocalData(tableName, newData, () => {
        resolve(true);
      });
    })();
  });
};

/**
 * getRemoteData
 * @desc 获取远程API接口数据
 * @param {string} apiURL 接口地址
 * @param {string} tableName 表名
 * @param {object} params 参数 default {}
 * @param {void} callback {object} result 回调
 */
const getRemoteData = (apiURL: string, tableName: string, params:object = {}, callback: (result: object) => void) => {
  debugLog(`[DEBUG][中间件]${tableName} 开始请求远程数据`);
  // 获取table对应的配置信息
  const tableConfig : any = getTableConfig(tableName);

  if(!tableConfig.remoteAPIMethod){
    return callback({ code: 500, message: "This table is missing remoteAPIMethod configuration" });
  }

  if(!apiURL){
    return callback({ code: 500, message: "apiURL can not be null" });
  }

  // 开始请求数据
  if(tableConfig.remoteAPIMethod === "POST"){
    request.post(apiURL, params ? params : {}, (result:object) => {
      debugLog(`[DEBUG][中间件]${tableName} POST远程数据请求完毕`);
      return callback(result);
    });
  }

  if(tableConfig.remoteAPIMethod === "GET"){
    request.get(apiURL, (result:object) => {
      debugLog(`[DEBUG][中间件]${tableName} GET远程数据请求完毕`);
      return callback(result);
    });
  }
};

/**
 * 查询tableName的配置信息
 * @param {string} tableName 表名称
 * @return {object}
 */
const getTableConfig = (tableName: string) => {
  let result: object = {};
  appGlobalTablesConfig.map((item) => {
    if(item.tableName === tableName){
      result = item;
    }
  });
  return result;
};

export {
  middlewareGetFullData,
  middlewareGetIncrementalData,
  middlewareGetMoreData,
  middlewareCheckDataExpired,
  middlewareGetLocalData,
  middlewareMaintainLocalData,
};
