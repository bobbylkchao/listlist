import React from "react";
import { View, Text, Button } from "react-native";
import SubPageWrapper from "../../containers/SubPageWrapper";
import { dbTransaction, dbShowTables, dbRebuildAllTables, dbDropAllTables } from "../../middleware/database";
import { getNetState, debugLog } from "../../utils";
import {
  middlewareGetFullData,
  middlewareGetIncrementalData,
  middlewareGetLocalData,
  middlewareGetMoreData,
  middlewareCheckDataExpired,
} from "../../middleware";

const TestHome = ({ navigation, route }: { navigation: any; route: any }) => {
  const dbTest = async () => {
    const getNowData: any = await middlewareGetLocalData('localpost');
    console.log(`localpost一共有 ${getNowData.message.length} 条数据记录...`);
  };

  let nowListLastLocalItemID: undefined | number;// 显示的列表中当前最后一个同城id
  const dbGetData = () => {
    middlewareGetFullData({
      tableName: 'localpost',
      bypass: false,
      params: {
        category_id: 0,
        area: 'index',
      },
    }, (r:any) => {
      if(r.code === 200){
        debugLog(`[DEBUG][中间件]数据获取完毕...message数组长度: ${r.message.message.length}`);
        nowListLastLocalItemID = r.message.message[r.message.message.length-1].id;
        debugLog(`[DEBUG][中间件]当前最后一个同城ID为: ${nowListLastLocalItemID}`);
      }else{
        console.log('数据获取失败...');
      }
    });
  };

  const dbGetIncrementalData = async () => {
    // 取出第一个id
    const getNowData: any = await middlewareGetLocalData('localpost');
    middlewareGetIncrementalData({
      tableName: 'localpost',
      params: {
        category_id: 0,
        area: 'index',
        fromID: getNowData.message && getNowData.message.length > 0 ? getNowData.message[0].id : 0,
      },
    }, (r:any) => r.code === 200 ? debugLog(`[DEBUG][中间件]数据获取完毕...message数组长度: ${r.message.message.length}`) : console.log('数据获取失败...'));
  };

  const dbGetMoreData = async () => {
    // const getNowData: any = await middlewareGetLocalData('localpost');

    if(!nowListLastLocalItemID){
      debugLog(`[DEBUG][中间件]没有获取到上一轮最后一个id (nowListLastLocalItemID), 操作被终止!`);
      return;
    }

    middlewareGetMoreData({
      tableName: 'localpost',
      params: {
        category_id: 0,
        area: 'index',
        fromID: nowListLastLocalItemID,
      },
    }, (r:any) => {
      if(r.code === 200){
        if(r.message.message && r.message.message.length > 0){
          debugLog(`[DEBUG][中间件]数据获取完毕...message数组长度: ${r.message.message.length}`);
          nowListLastLocalItemID = r.message.message[r.message.message.length-1].id;
          debugLog(`[DEBUG][中间件]当前最后一个同城ID为: ${nowListLastLocalItemID}`);
        }else{
          debugLog(`[DEBUG][中间件]数据获取完毕...没有更多数据了`);
        }
      }else{
        console.log(`数据获取失败...${r.message}`);
      }
    });
  };

  const dbGetMoreDataFixTen = async () => {
    const getNowData: any = await middlewareGetLocalData('localpost');
    middlewareGetMoreData({
      tableName: 'localpost',
      params: {
        category_id: 0,
        area: 'index',
        fromID: getNowData.message[9].id,
      },
    }, (r:any) => {
      if(r.code === 200){
        if(r.message.message && r.message.message.length > 0){
          debugLog(`[DEBUG][中间件]数据获取完毕...message数组长度: ${r.message.message.length}`);
          nowListLastLocalItemID = r.message.message[r.message.message.length-1].id;
          debugLog(`[DEBUG][中间件]当前最后一个同城ID为: ${nowListLastLocalItemID}`);
        }else{
          debugLog(`[DEBUG][中间件]数据获取完毕...没有更多数据了`);
        }
      }else{
        console.log(`数据获取失败...${r.message}`);
      }
    });
  };

  const dbDataExpiredTest = async () => {
    const result = await middlewareCheckDataExpired('adSwiper');
    console.log(`数据过期检测结果: ${result ? '已过期' : '未过期'}`);
    dbTransaction('SELECT timestamp FROM adSwiper;', [], (flag,result) => console.log(result.rows._array[0].timestamp));
  };

  return (
    <SubPageWrapper title="测试页面">
      <Button title="SQLite-SQL Test" onPress={() => dbTest()}/>
      <Button title="SQLite-Rebuild Tables" onPress={() => dbRebuildAllTables()}/>
      <Button title="SQLite-ShowTables" onPress={() => dbShowTables()}/>
      <Button title="SQLite-DropTables" onPress={() => dbDropAllTables()}/>
      <Button title="中间件-获取数据测试" onPress={() => dbGetData()}/>
      <Button title="中间件-获取增量数据测试" onPress={() => dbGetIncrementalData()}/>
      <Button title="中间件-获取更多数据测试(自动根据获取的全量数据最后一位取)" onPress={() => dbGetMoreData()}/>
      <Button title="中间件-获取更多数据测试(从固定的第10个开始取)" onPress={() => dbGetMoreDataFixTen()}/>
      <Button title="中间件-数据过期检测" onPress={() => dbDataExpiredTest()}/>
      <Button title="网络状态检测" onPress={() => getNetState(r => console.log(r))}/>
    </SubPageWrapper>
  );
};

export default TestHome;
