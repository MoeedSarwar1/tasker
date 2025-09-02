import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/navigation/Auth-stack';
import { AuthProvider, useAuth } from './src/context/Auth-context';
import HomeStack from './src/navigation/Home-stack';
import { API_URL } from '@env';
const RootNavigator = () => {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      {token ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
const App = () => {
  useEffect(() => {
    Platform.OS === 'android' && SplashScreen.hide();
    console.log('API URL:', API_URL);
  }, []);
  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1, backgroundColor: '#F9fafb' }}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
