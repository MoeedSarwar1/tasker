import { API_URL } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { AuthProvider, useAuth } from './src/context/Auth-context';
import AuthStack from './src/navigation/Auth-stack';
import BottomTabs from './src/navigation/BottomTabs';
const RootNavigator = () => {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      {token ? <BottomTabs /> : <AuthStack />}
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1, backgroundColor: '#F9fafb' }}>
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default App;
