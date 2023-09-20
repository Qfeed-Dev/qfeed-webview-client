import React, {useRef, useState, useEffect} from 'react';
import {BackHandler} from 'react-native';
import WebView from 'react-native-webview';
import Loading from '../Loading/Loading';

const WebViewContent = ({handleClose}: any) => {
  const webview = useRef<any>();
  const [isCanGoBack, setIsCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isCanGoBack) {
          webview.current.goBack();
        } else {
          handleClose();
        }
        return true;
      },
    );
    return () => backHandler.remove();
  }, [isCanGoBack, handleClose]);

  useEffect(() => {
    if (webview && webview.current.clearCache) {
      webview.current.clearCache();
    }
  }, [webview]);

  return (
    <>
      <WebView
        ref={webview}
        source={{uri: 'https://qfeed-client-web.vercel.app'}}
        style={{
          backgroundColor: '#131313',
        }}
        pullToRefreshEnabled={true}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
        mixedContentMode={'compatibility'}
        originWhitelist={['https://*', 'http://*']}
        overScrollMode={'never'}
        injectedJavaScript={`
          (function() {
              function wrap(fn) {
              return function wrapper() {
                  var res = fn.apply(this, arguments);
                  window.ReactNativeWebView.postMessage(window.location.href);
                  return res;
              }
              }
              history.pushState = wrap(history.pushState);
              history.replaceState = wrap(history.replaceState);
              window.addEventListener('popstate', function() {
              window.ReactNativeWebView.postMessage(window.location.href);
              });
          })();
          true;
          `}
        onMessage={event => {
          const url = event.nativeEvent.data;
          setIsCanGoBack(url !== 'https://qfeed-client-web.vercel.app');
        }}
        onLoad={() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }}
      />
      {loading ? <Loading /> : null}
    </>
  );
};

export default WebViewContent;
