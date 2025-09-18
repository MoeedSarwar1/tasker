import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/Theme-context';
import { tabNames } from './enums';
import { FriendsStack, HomeStack, SettingsStack } from './Home-stack';
import { allRequests } from '../network/Friends';

const BottomTabs = () => {
  const Tabs = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const data = await allRequests(); // returns user objects of friends
    setRequests(data);
  };

  useEffect(() => {
    loadRequests();
  }, [loadRequests()]);

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            backgroundColor: theme.colors.headerBackground,
            borderTopWidth: 0,
            paddingTop: 0,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          },
          Platform.OS === 'android' && {
            height: 70,
            elevation: 0, // Remove Android elevation shadow
            shadowOpacity: 0, // Remove iOS shadow
          },
        ].filter(Boolean),
        tabBarItemStyle: Platform.select({
          android: {
            height: 47,
            paddingVertical: 0,
            marginVertical: 4,
          },
          ios: {
            height: 50,
            paddingTop: 5,
          },
        }),
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
            <View style={{ position: 'relative' }}>
              <Icon
                name="account-group"
                size={26}
                color={
                  focused
                    ? theme.colors.primaryIcon
                    : theme.colors.secondaryIcon
                }
              />
              {requests.length > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -6,
                    top: -3,
                    backgroundColor: 'red',
                    borderRadius: 8,
                    minWidth: 16,
                    height: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 2,
                  }}
                >
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    {requests.length}
                  </Text>
                </View>
              )}
            </View>
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
