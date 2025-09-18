import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AboutScreen from '../screens/About-screen';
import FriendsScreen from '../screens/Friends-screen';
import HomeScreen from '../screens/Home-screen';
import PrivacySecurityScreen from '../screens/Privacy-screen';
import SettingsScreen from '../screens/Settings-screen';
import { TaskDetails } from '../screens/Task-details';
import { NavigationRoutes } from './enums';

export type RootStackParamList = {
  [NavigationRoutes.HOME]: undefined; // no params for Home
  [NavigationRoutes.FRIENDS]: undefined; // no params for Home
  [NavigationRoutes.SETTINGS]: undefined; // no params for Home
  [NavigationRoutes.ABOUT]: undefined; // no params for Home
  [NavigationRoutes.PRIVACY]: undefined; // no params for Homh
  [NavigationRoutes.TASKS]: undefined; // no params for Homh
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationRoutes.HOME} component={HomeScreen} />
      <Stack.Screen name={NavigationRoutes.TASKS} component={TaskDetails} />
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
const SettingsStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={NavigationRoutes.SETTINGS}
        component={SettingsScreen}
      />
      <Stack.Screen name={NavigationRoutes.ABOUT} component={AboutScreen} />
      <Stack.Screen
        name={NavigationRoutes.PRIVACY}
        component={PrivacySecurityScreen}
      />
    </Stack.Navigator>
  );
};

export { FriendsStack, HomeStack, SettingsStack };
