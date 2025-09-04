import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Home-stack';
import { tabNames } from './enums';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform } from 'react-native';

const BottomTabs = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: Platform.OS === 'ios' ? 80 : 60, // taller on iOS for safe area
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
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
              color={focused ? '#007AFF' : '#8e8e93'}
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
              color={focused ? '#007AFF' : '#8e8e93'}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
