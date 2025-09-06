import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Home-stack';
import { tabNames } from './enums';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomTabs = () => {
  const Tabs = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#F9fafb',
          height:
            Platform.OS === 'ios' ? 60 + insets.bottom : 45 + insets.bottom,
          paddingTop: 10,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          position: 'absolute', // gives a floating look
          left: 0,
          right: 0,
          bottom: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5, // Android shadow
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
              color={focused ? '#333333' : '#C0C0C0'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={tabNames.FRIENDS}
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="account-group"
              size={26}
              color={focused ? '#333333' : '#C0C0C0'}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
