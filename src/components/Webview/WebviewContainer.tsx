import React, {useRef, useState, useEffect, useCallback} from 'react';

import {BackHandler} from 'react-native';
import WebView from 'react-native-webview';

const WebViewContainer = () => {
  const webview = useRef<any>();
  const [isCanGoBack, setIsCanGoBack] = useState(false);
  const handlePressHardwareBackButton = useCallback(() => {
    if (webview.current && isCanGoBack) {
      webview.current.goBack();
      return true;
    } else {
      return false;
    }
  }, [isCanGoBack]);

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      handlePressHardwareBackButton,
    );
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handlePressHardwareBackButton,
      );
    };
  }, [isCanGoBack, handlePressHardwareBackButton]);

  return (
    <WebView
      ref={webview}
      source={{uri: 'https://naver.com'}}
      onMessage={({nativeEvent: state}) => {
        if (state.data === 'navigationStateChange') {
          setIsCanGoBack(state.canGoBack);
        }
      }}
    />
  );
};

export default WebViewContainer;
