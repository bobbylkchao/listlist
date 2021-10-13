/**
 * Example Component
 * @version 1.0.0
 * @author [YOUR NAME](youremail@cbrlife.com.au)
 * @description Description of this component
 * @param {DATATYPE} paramname (optional), description of this param
 */

import React from "react";
import { View, Text } from "react-native";

interface PropsInterface{
  /**
   * 标题
   */
  title: string;
  /**
   * 年龄
   */
  age: number;
  /**
   * 国家
   * @default Canada
   */
  country?: string;
}

const Example:React.FC<PropsInterface> = (props) => {
  return(
    <View>
      <Text>{ props.title }</Text>
    </View>
  );
};

export default Example;
