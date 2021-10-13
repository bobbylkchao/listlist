import React from "react";
import { ScrollView, Text } from 'react-native';
import Wrapper from "../../containers/Wrapper";

const ForumHome = () => {
  return(
    <Wrapper showbg={true}>
      <ScrollView style={{ flex: 1 }}>
        <Text>Forum Home</Text>
      </ScrollView>
    </Wrapper>
  );
};

export default ForumHome;
