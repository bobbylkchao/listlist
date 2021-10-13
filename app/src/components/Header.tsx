/**
 * Page Header Component
 * @version 1.0.0
 * @author [Bobby Chao](dev-bobby@cbrlife.com.au)
 * @desc Custom page header component
 * @param {string} title header title, default is 'CBRLife堪生活'
 * @param {number} bottom margin-bottom distance, default is 10px
 */

import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Divider, Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props:any) => (
  <Icon {...props} name='arrow-back' />
);

const Header = (props: any) => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return(
    <>
      <TopNavigation
        alignment='center'
        accessoryLeft={BackAction}
        title={evaProps => <Text {...evaProps} style={{ fontWeight: 'bold' }}>{ props.headerTitle ? props.headerTitle : 'CBRLife堪生活' }</Text>}
      />
      <Divider style={{ backgroundColor: '#d6d6d6', marginBottom: props.bottom || props.bottom === 0 ? props.bottom : 10 }}/>
    </>
  );
};

export default Header;
