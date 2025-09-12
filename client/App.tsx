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
import { FriendsProvider } from './src/context/Friends-context';
import SocketManager from './src/context/Socket-context';

const RootNavigator = () => {
  const { token, loading } = useAuth();
  const { isDark, theme } = useTheme();

  if (loading) {
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
      {token ? (
        <FriendsProvider>
          <SocketManager />
          <BottomTabs />
        </FriendsProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ModalProvider>
          <PortalProvider>
            <SafeAreaProvider>
              <AuthProvider>
                <ThemedApp />
              </AuthProvider>
            </SafeAreaProvider>
          </PortalProvider>
        </ModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

// ✅ Now safely use theme inside this child
const ThemedApp = () => {
  const { theme, isDark } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000' : '#fff'}
      />
      <RootNavigator />
    </View>
  );
};

export default App;
