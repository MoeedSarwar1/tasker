import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/navigation/Auth-stack';

const App = () => {
  useEffect(() => {
    Platform.OS === 'android' && SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <View style={{ flex: 1, backgroundColor: '#F9fafb' }}>
          {/* <HomeStack /> */}
          <AuthStack /> /
        </View>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
