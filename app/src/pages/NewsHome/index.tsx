import React from "react";
import { Text } from "react-native";
import Wrapper from "../../containers/Wrapper";
import WeatherAndRating from "../../components/WeatherAndRating";
import NewsCategorySwiper from "./NewsCategorySwiper";
import TopADSwiper from "../../components/TopADSwiper";
import DividerHeight from "../../components/DividerHeight";
import Menu from "../../components/Menu";

const NewsHome = () => {
  return (
    <Wrapper showbg={true}>
      <WeatherAndRating />
      <DividerHeight />
      <NewsCategorySwiper />
      <DividerHeight />
      <TopADSwiper />
      <DividerHeight />
      <Menu/>
    </Wrapper>
  );
};

export default NewsHome;
