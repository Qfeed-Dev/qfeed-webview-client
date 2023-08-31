import React from 'react';

import {BackHandler, SafeAreaView, StatusBar} from 'react-native';
import WebViewContent from './WebviewContent';

const WebViewContainer = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: '#131313'}}>
        <WebViewContent handleClose={{onPress: () => BackHandler.exitApp()}} />
      </SafeAreaView>
    </>
  );
};

export default WebViewContainer;
