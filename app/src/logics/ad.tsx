/**
 * ad 广告核心逻辑
 */
import { appGlobalConfig } from '../../config/app.global.config';
import { middlewareCheckDataExpired, middlewareGetFullData } from '../middleware';
/**
 * 获取广告数据
 * @https://www.showdoc.com.cn/729961848516443/4770489749424493
 *
 * adtype广告类型:
 * 1 主页顶部轮播广告位
 * 2 主页信息流插播广告位
 * 12 子版块信息流插播位
 * 4 长图条幅广告位
 * 5 黄页顶部轮播广告位
 * 6 所有详情页底部广告位
 * 7 同城子板块顶部广告位
 * 8 主页置顶位
 * 9 主页中部banner广告位
 * 10 新闻详情页底部广告位
 * 11 新闻详情页顶部广告位(标题下面)
 * 19 新闻详情页顶部广告位(标题上面/仅App显示)
 * 13 同城详情页顶部广告位
 * 15 同城贴发布类型选择界面底部广告
 * 14 APP弹窗广告位(主页)
 * 16 APP弹窗广告位(同城)
 * 17 APP弹窗广告位(黄页)
 * 18 活动主页顶部广告位
 *
 * urltype广告事件类型
 * 3 指向图片 eventType:showImages
 * 4 指向微信号 eventType:clipboard
 * 6 指向黄页 eventType:toScreen, key: YellowDetails
 * 7 指向专题 eventType:toScreen, key: Topic
 * 8 指向APP下载页 eventType:toScreen
 * 20 指向新闻 eventType:toScreen, key: NewsDetails
 * 21 指向堪发现帖子 eventType:toScreen, key: EventDetails
 * 22 指向黄页主页 eventType:toScreen, key: YellowHome
 * 23 指向堪发现主页 eventType:toScreen, key: EventHome
 * 24 指向同城帖 eventType:toScreen, key: LocalDetails
 * 25 指向黄页主页 eventType:toScreen, key: YellowHome
 * 26 指向论坛主页 eventType:toScreen, key: ForumHome
 * 27 指向论坛帖子 eventType:toScreen, key: ForumDetailsHome
 * 28 指向直播页面 eventType:toScreen
 * 30 指向新闻爆料页面 eventType:toScreen, key: NewsReportHome
 * 31 指向2021中国好声音报名页面 eventType:toScreen
 * 1001 指向投票页面 eventType:toScreen, key: Topic
 * 29 外链 browser
 * 1002 指向活动主页 eventType:toScreen, key: Event
 * 1003 指向活动详情页 eventType:toScreen, key: EventDetails
 */
export const ad = {
  getADsSwiperParams: (ads: {}[]) => {
    // 定义返回结果集
    const adParamsResult = new Array();

    // 广告URLType和swiper组件的eventType对应关系
    const adAreaEventType = [
      {
        eventType: "showImages",
        adAreaIDs: [3],
      },
      {
        eventType: "toScreen",
        adAreaIDs: [6, 7, 8, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 1001, 1002, 1003],
      },
      {
        eventType: "browser",
        adAreaIDs: [29],
      },
      {
        eventType: "clipboard",
        adAreaIDs: [4],
      },
    ];

    // 根据返回的广告条目, 逐一遍历然后根据swiper组件的interface规范, 重组参数
    ads.map((r: any) => {
      if(r.urltype !== 8 || r.urltype !== 28 || r.urltype !== 31){
        // 查找结果并返回URLType和swiper组件的eventType对应关系的index
        const adAreaEventTypeIndex = adAreaEventType.findIndex(items => items.adAreaIDs.find(element => element === r.urltype));

        const thisADEventType = adAreaEventTypeIndex ? adAreaEventType[adAreaEventTypeIndex].eventType : 'NotConfigured';

        // 初始化event details数据集
        let thisADEventDetails;

        // 根据event type, 生成screenParams参数
        if(thisADEventType === "showImages"){
          thisADEventDetails = [];
          thisADEventDetails.push({ url: r.adPic });
        }

        if(thisADEventType === "toScreen"){
          thisADEventDetails = [];
          // EventType为跳转页面时, 生成页面名称及页面参数
          let screenName = ""; // 页面名称
          let screenKey = ""; // 页面参数

          switch(r.urltype){
            case 6:
              // 指向黄页
              screenName = "YellowDetails";
              screenKey = r.toYellowPage ? r.toYellowPage : 0;
              break;
            case 7:
              // 指向专题
              screenName = "Topic";
              screenKey = r.toEventsPage ? r.toEventsPage : 0;
              break;
            case 20:
              // 指向新闻
              screenName = "NewsDetails";
              screenKey = r.toNewsPage ? r.toNewsPage : 0;
              break;
            case 21:
              // 指向堪发现帖子
              screenName = "EventDetails";
              screenKey = r.toEventsPage ? r.toEventsPage : 0;
              break;
            case 22: case 25:
              // 指向黄页主页
              screenName = "YellowHome";
              screenKey = "";
              break;
            case 23:
              // 指向堪发现主页
              screenName = "EventHome";
              screenKey = "";
              break;
            case 24:
              // 指向同城帖
              screenName = "LocalDetails";
              screenKey = r.toPostPage ? r.toPostPage : 0;
              break;
            case 26:
              // 指向论坛主页
              screenName = "ForumHome";
              screenKey = "";
              break;
            case 27:
              // 指向论坛帖子
              screenName = "ForumDetailsHome";
              screenKey = r.toForumPage ? r.toForumPage : 0;
              break;
            case 30:
              // 指向新闻爆料页面
              screenName = "NewsReportHome";
              screenKey = "";
              break;
            case 1001:
              // 指向投票页面
              screenName = "Topic";
              screenKey = r.toVotePage ? r.toVotePage : 0;
              break;
            case 1002:
              // 指向活动主页
              screenName = "Event";
              screenKey = "";
              break;
            case 1003:
              // 指向活动详情页
              screenName = "EventDetails";
              screenKey = r.toEventsPage ? r.toEventsPage : 0;
              break;
            default:
              break;
          }

          // 生成参数
          if(screenName){
            thisADEventDetails = {
              screenName: screenName,
              screenParams: {
                key: screenKey,
              },
            };
          }
        }

        if(thisADEventType === "clipboard"){
          thisADEventDetails = {
            text: r.toWeixin_number,
            toastMsg: r.toWeixin_notice,
          };
        }

        if(thisADEventType === "browser"){
          thisADEventDetails = {
            url: r.toURL,
          };
        }

        // 重组Event Details
        adParamsResult.push({
          imageURL: appGlobalConfig.UploadImgURLPrefix + r.adPic,
          eventType: thisADEventType,
          eventDetails: thisADEventDetails,
        });

      }else{
        // 这个else下的不重组Event Details
        adParamsResult.push({
          imageURL: appGlobalConfig.UploadImgURLPrefix + r.adPic,
          eventType: "NotConfigured",
          eventDetails: [{}],
        });
      }
    });// map loop end

    return adParamsResult;
  },
  getSwiperAD: async (props: { area: number }, callback: any) => {
    // 获取轮播位置的广告

    //检测有无过期
    const checkLocalDataExpiredStatus = await middlewareCheckDataExpired('adSwiper');
    let paramByPass;
    if(checkLocalDataExpiredStatus){
      // 已过期
      paramByPass = true;
    }else{
      // 未过期
      paramByPass = false;
    }

    middlewareGetFullData({
      tableName: 'adSwiper',
      bypass: paramByPass,
      params: {
        area_id: props.area,
      },
    }, (result: any) => {
      callback(result.message.message ? ad.getADsSwiperParams(result.message.message) : []);
    });
  },
};
