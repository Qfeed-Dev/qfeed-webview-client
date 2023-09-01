import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {} from 'react-native/Libraries/NewAppScreen';
import WebViewContainer from './src/components/Webview/WebviewContainer';

function App(): JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      if (SplashScreen) {
        SplashScreen.hide();
      }
    }, 1000);
  }, []);

  return <WebViewContainer />;
}

export default App;
