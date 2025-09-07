import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { AuthProvider, useAuth } from './src/context/Auth-context';
import AuthStack from './src/navigation/Auth-stack';
import BottomTabs from './src/navigation/BottomTabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ModalProvider } from './src/context/Modal-context';
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
      <ModalProvider>
        <PortalProvider>
          <StatusBar
            barStyle="dark-content" // or "light-content" if using dark bg
            backgroundColor="#F9FAFB" // match your app bg
            translucent={false} // keep it solid
          />

          <View style={{ flex: 1, backgroundColor: '#F9fafb' }}>
            <SafeAreaProvider>
              <AuthProvider>
                <RootNavigator />
              </AuthProvider>
            </SafeAreaProvider>
          </View>
        </PortalProvider>
      </ModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
