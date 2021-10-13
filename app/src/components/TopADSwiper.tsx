/**
 * TopADSwiper Component
 * @version 1.0.0
 * @author [Bobby Chao](dev-bobby@cbrlife.com.au)
 */
import React from "react";
import { debugLog } from "../utils";
import Swipers from "./Swipers";
import { ad } from "../logics/ad";
import adSwiperPlaceholder from "../../assets/img/adSwiperPlaceholder.jpeg";

const TopADSwiper = () => {
  const [topSwiperList, setTopSwiperList] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    debugLog(`[DEBUG]顶部广告轮播加载...`);
    ad.getSwiperAD({ area: 1 }, (result: []) => {
      if(result && result.length > 0){
        setTopSwiperList(result);
      }else{
        const blankResult: any = [{
          imageURL: adSwiperPlaceholder,
          eventType: 'showImages',
          eventDetails: [{
            url: adSwiperPlaceholder,
          }],
        }];
        setTopSwiperList(blankResult);
      }
    });
  };

  return(
    <Swipers items={topSwiperList} />
  );
};

export default TopADSwiper;
