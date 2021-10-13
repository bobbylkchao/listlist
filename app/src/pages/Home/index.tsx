import React from 'react';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import NewsHome from '../NewsHome';
import LocalHome from '../LocalHome';
import YellowHome from '../YellowHome';
import MeHome from '../MeHome';

// init bottom tab navigator
const { Navigator, Screen } = createBottomTabNavigator();

// icons https://akveo.github.io/eva-icons/#/
const NewsHomeIcon = (props:any) => (
  <Icon {...props} name='home-outline'/>
);

const LocalHomeIcon = (props:any) => (
  <Icon {...props} name='pin-outline'/>
);

const YellowHomeIcon = (props:any) => (
  <Icon {...props} name='list-outline'/>
);

const MeHomeIcon = (props:any) => (
  <Icon {...props} name='person-outline'/>
);

const BottomTabBar = ({ navigation, state }:{ navigation:any, state:any }) => {
  return(
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
      <BottomNavigation
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}
          appearance="noIndicator"
        >
        <BottomNavigationTab title="新闻" icon={NewsHomeIcon}/>
        <BottomNavigationTab title="同城" icon={LocalHomeIcon}/>
        <BottomNavigationTab title="黄页" icon={YellowHomeIcon}/>
        <BottomNavigationTab title="我的" icon={MeHomeIcon}/>
      </BottomNavigation>
    </SafeAreaView>
  );
};

const Home = () => {
  return(
    <Navigator tabBar={props => <BottomTabBar {...props}/>}>
      <Screen name="NewsHome" component={NewsHome} />
      <Screen name="LocalHome" component={LocalHome} />
      <Screen name="YellowHome" component={YellowHome} />
      <Screen name="MeHome" component={MeHome} />
    </Navigator>
  );
};

export default Home;
