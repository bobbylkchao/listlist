/**
 * DefaultLoadingIndicator Component
 * @version 1.0.0
 * @author [Bobby Chao](dev-bobby@cbrlife.com.au)
 * @description A default component to show the loading indicator
 */

import React from 'react';
import { ActivityIndicator } from 'react-native';

const DefaultLoadingIndicator = () => {
  return(
    <>
      <ActivityIndicator animating={true} size="large" style={{
        flex: 1,
      }}/>
    </>
  );
};

export default DefaultLoadingIndicator;
