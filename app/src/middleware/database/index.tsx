import * as SQLite from 'expo-sqlite';
import { appGlobalTablesConfig } from '../model.config';
import { debugLog } from '../../utils';

// 创建及连接SQLite数据库
const dbConnect = (callback: (result:any) => void) => {
  callback(SQLite.openDatabase("cbrlife"));
};

// 数据库初始化
const dbInit = (callback? : () => void) => {
  debugLog("[DEBUG][DB]DB开始初始化....");
  appGlobalTablesConfig.map((item) => {
    if(item.create){
      dbTransaction(item.create);
      debugLog(`[DEBUG][DB]自动判断是否创建Table: ${item.tableName}完成`);
    }else{
      debugLog(`[DEBUG][DB]自动判断是否创建Table: ${item.tableName}失败, 缺少配置`);
    }
  });
  debugLog("[DEBUG][DB]DB初始化完毕....");
  return callback ? callback() : null;
};

// 数据库重建表
const dbRebuildAllTables = (callback?: () => void) => {
  debugLog("[DEBUG][DB]DB开始重建....");
  appGlobalTablesConfig.map((item) => {
    if(item.create){
      dbTransaction(`DROP TABLE IF EXISTS ${item.tableName};`);
      dbTransaction(item.create);
      debugLog(`[DEBUG][DB]重建Table: ${item.tableName}完成`);
    }else{
      debugLog(`[DEBUG][DB]重建Table: ${item.tableName}失败, 缺少配置`);
    }
  });
  callback ? callback() : null;
  debugLog("[DEBUG][DB]DB重建完毕....");
};

// 数据库执行事务SQL
const dbTransaction = (sql:string | undefined, value?:string[], callback?: (flag:boolean, result:any) => void) => {
  dbConnect((r) => {
    r.transaction((tx:any) => {
      tx.executeSql(
        sql,
        value ? value : [],
        callback ? (_:any, result:any) => callback(true, result) : null,
        callback ? (_:any, error:any) => callback(false, error) : null,
      );
    });
  });
};

// 数据库显示所有表
const dbShowTables = () => {
  return new Promise((resolve) => {
    dbTransaction(`SELECT * FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`, [], (flag, result) => {
      resolve(result);
    });
  });
};

// 数据库检查表
const dbCheckTable = (tableName: string, callback: (result: boolean) => void) => {
  dbTransaction(`SELECT count(*) as c FROM sqlite_master WHERE type='table' AND name = ?;`, [tableName], (flag, result) => {
    callback(parseInt(result.rows._array[0].c) > 0 ? true : false);
  });
};

// 数据库删除表
const dbDropAllTables = () => {
  debugLog("[DEBUG][DB]DB开始Drop....");
  appGlobalTablesConfig.map((item) => {
    dbTransaction(`DROP TABLE IF EXISTS ${item.tableName};`);
  });
  debugLog("[DEBUG][DB]DBDrop完毕....");
};

export {
  dbInit,
  dbTransaction,
  dbRebuildAllTables,
  dbShowTables,
  dbCheckTable,
  dbDropAllTables,
};
