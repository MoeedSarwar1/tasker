import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/Home-screen';
import { NavigationRoutes } from './enums';
import FriendsScreen from '../screens/Friends-screen';

export type RootStackParamList = {
  [NavigationRoutes.HOME]: undefined; // no params for Home
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationRoutes.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

const FriendsStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationRoutes.FRIENDS} component={FriendsScreen} />
    </Stack.Navigator>
  );
};

export { HomeStack, FriendsStack };
