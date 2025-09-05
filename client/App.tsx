import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
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
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#F9fafb' }}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
