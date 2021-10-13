import React from "react";
import { Text } from "react-native";
import SubPageWrapper from "../../containers/SubPageWrapper";

const SearchHome = ({ navigation, route }: { navigation: any; route: any }) => {
  return (
    <SubPageWrapper title="搜索">
      <Text>传递参数key的值为: {route.params.key}</Text>
    </SubPageWrapper>
  );
};

export default SearchHome;
