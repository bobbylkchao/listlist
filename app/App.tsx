import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/reducer/store';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { subscribeNetState } from './src/utils';
import Routes from './src/routes';
import ImageViewModal from './src/components/ImageViewModal';
import { dbInit } from './src/middleware/database';
import { middlewareMaintainLocalData } from './src/middleware';

export default () => {
  React.useEffect(() => {
    dbInit(() => {
      middlewareMaintainLocalData();
    });
    subscribeNetState();
    StatusBar.setBarStyle('dark-content');
  }, []);

  return(
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Routes />
      </ApplicationProvider>
      <ImageViewModal/>
    </Provider>
  );
};
