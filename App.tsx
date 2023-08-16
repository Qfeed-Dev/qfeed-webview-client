import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {} from 'react-native/Libraries/NewAppScreen';
import WebViewContainer from './src/components/Webview/WebviewContainer';

function App(): JSX.Element {
  const Stack = createStackNavigator();

  useEffect(() => {
    setTimeout(() => {
      if (SplashScreen) {
        SplashScreen.hide();
      }
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Details"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}>
        <Stack.Screen
          options={{
            transitionSpec: {
              open: {
                animation: 'spring',
                config: {
                  stiffness: 2000,
                  damping: 1000,
                },
              },
              close: {
                animation: 'spring',
                config: {
                  stiffness: 1000,
                  damping: 500,
                },
              },
            },
          }}
          name="Details"
          component={WebViewContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
