import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/Theme-context';
import { tabNames } from './enums';
import { FriendsStack, HomeStack, SettingsStack } from './Home-stack';

const BottomTabs = () => {
  const Tabs = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.headerBackground,
          height:
            Platform.OS === 'ios' ? 60 + insets.bottom : 45 + insets.bottom,
          paddingTop: 10,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        },
      }}
    >
      <Tabs.Screen
        name={tabNames.HOME}
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={26}
              color={
                focused ? theme.colors.primaryIcon : theme.colors.secondaryIcon
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name={tabNames.FRIENDS}
        component={FriendsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="account-group"
              size={26}
              color={
                focused ? theme.colors.primaryIcon : theme.colors.secondaryIcon
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name={tabNames.SETTINGS}
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="account-settings"
              size={26}
              color={
                focused ? theme.colors.primaryIcon : theme.colors.secondaryIcon
              }
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
