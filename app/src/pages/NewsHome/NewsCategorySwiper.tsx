import React from "react";
import { StyleSheet, ScrollView, View, Text, useWindowDimensions, TouchableOpacity, Animated, FlatList } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useDispatch } from "react-redux";
import { debugLog } from "../../utils";
import { middlewareGetFullData } from "../../middleware";

const componentInit = (callback: (result: []) => void) => {
  debugLog(`[DEBUG]News Category Swiper组件初始化...`);
  middlewareGetFullData({
    tableName: "newsCategory",
    bypass: false,
    params: {},
  }, (result: any) => {
    if(result.message.message){
      callback(result.message.message);
    }else{
      callback([]);
    }
  });
};

const CoreContentComponent = (props:{categories: []}) => {
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState<number>(0);

  const clickChangeIndex = (id: number) => {
    setIndex(id);
    dispatch({
      type: 'changeNewsCategory',
      value: id,
    });
  };

  const ContentComponentItem = ({ categoryID, categoryName }:{ categoryID:number, categoryName:string }) => {
    return(
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => clickChangeIndex(categoryID)}
      >
        <Text style={{
          fontWeight: index===categoryID ? 'bold' : 'normal',
          color: index===categoryID ? '#007aff' : '#000000',
        }}>{categoryName}</Text>
      </TouchableOpacity>
    );
  };

  return(
    <ScrollView
      style={styles.tabBar}
      horizontal={true}
    >
      <ContentComponentItem key={0} categoryID={0} categoryName="推荐"/>
      {
        props.categories.map((item:any) => {
          return(
            <ContentComponentItem key={item.news_category_id} categoryID={item.news_category_id} categoryName={item.news_category_name}/>
          );
        })
      }
    </ScrollView>
  );
};

const NewsCategorySwiper = () => {
  const [cateResult, changeCateResult] = React.useState<[]>([]);

  React.useEffect(() => {
    componentInit((r) => {
      changeCateResult(r);
    });
  }, []);

  return cateResult && cateResult.length > 0 ? <CoreContentComponent categories={cateResult}/> : null;
};

const styles = StyleSheet.create({
  newsListView: {
    flex: 1,
    backgroundColor: '#673ab7',
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(165, 165, 165, 0.2)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default NewsCategorySwiper;
