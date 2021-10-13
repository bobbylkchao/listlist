import React from 'react';
import { ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Wrapper from '../../containers/Wrapper';
import { openscreen, restartApp } from '../../utils';

const MeHome = () => {
  const navigation = useNavigation();

  return(
    <Wrapper showbg={false}>
      <ScrollView style={{ flex: 1 }}>
        <Button onPress={() => openscreen({ navigation: navigation, screenName: "Test" })} title='跳转到测试页面'/>
        <Button onPress={() => restartApp()} title='重载App'/>
      </ScrollView>
    </Wrapper>
  );
};

export default MeHome;
