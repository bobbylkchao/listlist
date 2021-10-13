import React from "react";
import { Text } from "react-native";
import SubPageWrapper from "../../containers/SubPageWrapper";

const YellowDetailsHome = ({ navigation, route }: { navigation: any; route: any }) => {
  return (
    <SubPageWrapper title="黄页">
      <Text>传递参数key的值为: {route.params.key}</Text>
    </SubPageWrapper>
  );
};

export default YellowDetailsHome;
