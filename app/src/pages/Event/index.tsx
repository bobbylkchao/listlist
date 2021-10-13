import React from "react";
import { ScrollView, Text } from 'react-native';
import Wrapper from "../../containers/Wrapper";

const EventHome = () => {
  return(
    <Wrapper showbg={true}>
      <ScrollView style={{ flex: 1 }}>
        <Text>Event Home</Text>
      </ScrollView>
    </Wrapper>
  );
};

export default EventHome;
