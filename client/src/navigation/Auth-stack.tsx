import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/Login-screen';
import { NavigationRoutes } from './enums';
import RegisterationScreen from '../screens/Registeration-screen';
import HomeScreen from '../screens/Home-screen';

export type RootStackParamList = {
  [NavigationRoutes.LOGIN]: undefined; // no params for Home
  [NavigationRoutes.REGISTER]: undefined; // no params for Home
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={NavigationRoutes.REGISTER}
        component={RegisterationScreen}
      />
      <Stack.Screen name={NavigationRoutes.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
