import React from "react";
import { ScrollView, Text } from 'react-native';
import Wrapper from "../../containers/Wrapper";

const PublishHome = () => {
  return(
    <Wrapper showbg={false}>
      <ScrollView style={{ flex: 1 }}>
        <Text>Publish Home</Text>
      </ScrollView>
    </Wrapper>
  );
};

export default PublishHome;
