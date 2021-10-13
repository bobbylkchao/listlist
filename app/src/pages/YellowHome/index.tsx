import React from "react";
import { ScrollView, Text } from 'react-native';
import Wrapper from "../../containers/Wrapper";

const YellowHome = () => {
  return(
    <Wrapper showbg={true}>
      <ScrollView style={{ flex: 1 }}>
        <Text>Yellow Home</Text>
      </ScrollView>
    </Wrapper>
  );
};

export default YellowHome;
