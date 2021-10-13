import React from "react";
import { Text } from "react-native";
import SubPageWrapper from "../../containers/SubPageWrapper";

const LocalCateHome = ({ navigation, route }:{ navigation:any, route:any }) => {
  return(
    <SubPageWrapper title={ route.params.name }>
      <Text>传递参数id的值为: { route.params.id }</Text>
    </SubPageWrapper>
  );
};

export default LocalCateHome;
