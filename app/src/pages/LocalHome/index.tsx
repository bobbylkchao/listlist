import React from "react";
import { ScrollView, Text } from 'react-native';
import Wrapper from "../../containers/Wrapper";

const LocalHome = () => {
  return(
    <Wrapper showbg={true}>
      <ScrollView style={{ flex: 1 }}>
        <Text>Local Home</Text>
      </ScrollView>
    </Wrapper>
  );
};

export default LocalHome;
