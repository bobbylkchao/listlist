import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import NewsDetailsHome from '../pages/NewsDetailsHome';
import LocalDetailsHome from '../pages/LocalDetailsHome';
import YellowDetailsHome from '../pages/YellowDetailsHome';
import PublishHome from '../pages/PublishHome';
import SearchHome from '../pages/SearchHome';
import LocalCateHome from '../pages/LocalCateHome';
import BrowserHome from '../pages/BrowserHome';
import EventHome from '../pages/Event';
import EventDetailsHome from '../pages/EventDetails';
import ForumHome from '../pages/Forum';
import ForumDetailsHome from '../pages/ForumDetails';
import TopicHome from '../pages/Topic';
import NewsReportHome from '../pages/NewsReportHome';
import TestHome from '../pages/Test';

const { Navigator, Screen } = createStackNavigator();

// config router linking prefixes
const routerLinking = {
  prefixes: ['https://www.canberraport.com', 'cbrlife://'],
};

// route configuation: https://reactnavigation.org/docs/stack-navigator/#api-definition
// remark: gesture does not support web
const Routes = () => {
  return(
    <NavigationContainer linking={routerLinking}>
      <Navigator
        headerMode='none'
        initialRouteName="Home"
        screenOptions={({ route, navigation }) => ({
          gestureEnabled: true,
          cardOverlayEnabled: false,
          animationEnabled: true,
        })}
      >
        <Screen name="Home" component={Home}/>
        <Screen name="NewsDetails" component={NewsDetailsHome}/>
        <Screen name="LocalDetails" component={LocalDetailsHome}/>
        <Screen name="YellowDetails" component={YellowDetailsHome}/>
        <Screen name="Publish" component={PublishHome}/>
        <Screen name="Search" component={SearchHome}/>
        <Screen name="LocalCate" component={LocalCateHome}/>
        <Screen name="Browser" component={BrowserHome}/>
        <Screen name="Event" component={EventHome}/>
        <Screen name="EventDetails" component={EventDetailsHome}/>
        <Screen name="ForumHome" component={ForumHome}/>
        <Screen name="ForumDetailsHome" component={ForumDetailsHome}/>
        <Screen name="Topic" component={TopicHome}/>
        <Screen name="NewsReportHome" component={NewsReportHome}/>
        <Screen name="Test" component={TestHome}/>
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
