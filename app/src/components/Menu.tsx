/**
 * Menu Component
 * @version 1.0.0
 * @author [Michael Gong](dev-michael@cbrlife.com.au)
 * @description This component displays the menu.
 */

import React from "react";
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { openscreen } from "../utils";

const menuConfigs =[
  {
    id: 1,
    title: "求职招聘",
    icon: require("../../assets/menu_icons/job.png"),
  },

  {
    id: 2,
    title: "房屋租赁",
    icon: require("../../assets/menu_icons/house.png"),
  },

  {
    id: 3,
    title: "汽车交易",
    icon: require("../../assets/menu_icons/carsale.png"),
  },

  {
    id: 4,
    title: "生意转让",
    icon: require("../../assets/menu_icons/business.png"),
  },

  {
    id: 5,
    title: "拼车信息",
    icon: require("../../assets/menu_icons/pinche.png"),
  },

  {
    id: 6,
    title: "二手市场",
    icon: require("../../assets/menu_icons/ershou.png"),
  },

  {
    id: 7,
    title: "当面换汇",
    icon: require("../../assets/menu_icons/exchange.png"),
  },

  {
    id: 8,
    title: "堪活动",
    icon: require("../../assets/menu_icons/book.png"),
  },

  {
    id: 9,
    title: "社区论坛",
    icon: require("../../assets/menu_icons/forum.png"),
  },

  {
    id: 10,
    title: "堪城黄页",
    icon: require("../../assets/menu_icons/yellowpage.png"),
  },

];

const MenuItem = (props:{item:{id:number; title: string; icon: any}}) => {
  const navigation = useNavigation();

  return(
    <TouchableWithoutFeedback onPress={() => openscreen({ navigation: navigation, screenName: 'LocalCate', params: { id: props.item.id, name: props.item.title } })}>
      <View style={styles.perRow}>
        <View style={styles.item}>
          <View style={styles.imgContainer}>
              <Image style={styles.img} source={props.item.icon} resizeMode="stretch"/>
          </View>
          <View style={styles.titleContainer}>
              <Text style={styles.title}>{props.item.title}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Menu = () => {
  return (
      <View style={styles.container}>
        {
          menuConfigs.map((item, key) => <MenuItem item={item} key={key}/>)
        }
      </View>
  );
};

const styles = StyleSheet.create({
  container:{
    borderRadius: 4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(165, 165, 165, 0.2)',
  },
  perRow: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '19.999%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  item:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img:{
    display:"flex",
    marginLeft:"auto",
    marginRight:"auto",
    height: 28,
    width: 28,
  },
  title:{
    fontSize:13,
  },
  imgContainer:{
    flex: 1,
  },
  titleContainer:{
    marginTop: 6,
    flex: 1,
  },
});

export default Menu;
