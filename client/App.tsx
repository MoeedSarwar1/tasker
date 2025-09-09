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
import { ThemeProvider, useTheme } from './src/context/Theme-context';
const RootNavigator = () => {
  const { token, loading } = useAuth();
  const { isDark, theme } = useTheme(); // <-- get theme here

  if (loading) {
    // temporary splash or loader
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
          translucent={false}
        />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {token ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
const App = () => {
  const { theme, isDark } = useTheme(); // <-- get theme here

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ModalProvider>
          <PortalProvider>
            <StatusBar
              barStyle={isDark ? 'light-content' : 'dark-content'}
              backgroundColor={theme.colors.background}
              translucent={false}
            />

            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
              <SafeAreaProvider>
                <AuthProvider>
                  <RootNavigator />
                </AuthProvider>
              </SafeAreaProvider>
            </View>
          </PortalProvider>
        </ModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};
export default App;
