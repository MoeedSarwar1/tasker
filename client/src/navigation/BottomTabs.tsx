import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/Theme-context';
import { NavigationRoutes, tabNames } from './enums';
import { FriendsStack, HomeStack, SettingsStack } from './Home-stack';
import { allRequests } from '../network/Friends';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const BottomTabs = () => {
  const Tabs = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const [requests, setRequests] = useState([]);

  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    console.log('Current route name:', routeName); // Debug line - remove later

    // Add the actual screen names that should hide the tab bar
    const hiddenScreens = [
      NavigationRoutes.TASKS,
      NavigationRoutes.PRIVACY,
      NavigationRoutes.ABOUT,
      // Add other screens that should hide the tab bar
    ];
    return !hiddenScreens.includes(routeName);
  };

  // Create the common tab bar style
  const getTabBarStyle = route => {
    return getTabBarVisibility(route)
      ? {
          backgroundColor: theme.colors.bottomNavBackground,
          borderTopWidth: 0,
          paddingTop: 12,
          paddingBottom: insets.bottom > 0 ? insets.bottom + 12 : 20,
          paddingHorizontal: 16,
          height: Platform.select({
            android: 75 + (insets.bottom > 0 ? insets.bottom : 0),
            ios: 85 + insets.bottom,
          }),
          // Remove shadows/elevation
          ...Platform.select({
            android: {
              elevation: 0,
            },
            ios: {
              shadowOpacity: 0,
            },
          }),
          // Modern border radius
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }
      : { display: 'none' };
  };

  const getTabBarItemStyle = route => {
    return getTabBarVisibility(route)
      ? {
          paddingVertical: 8,
          marginHorizontal: 6,
          borderRadius: 16,
          minHeight: 60,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }
      : { display: 'none' };
  };

  const loadRequests = useCallback(async () => {
    try {
      const data = await allRequests();
      setRequests(data || []);
    } catch (error) {
      console.error('Failed to load friend requests:', error);
      setRequests([]);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primaryIcon,
        tabBarInactiveTintColor: theme.colors.secondaryIcon,
        tabBarHideOnKeyboard: Platform.OS === 'android',
      }}
    >
      <Tabs.Screen
        name={tabNames.HOME}
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: getTabBarStyle(route),
          tabBarItemStyle: getTabBarItemStyle(route),
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={28}
                color={color}
              />
            </View>
          ),
        })}
      />
      <Tabs.Screen
        name={tabNames.FRIENDS}
        component={FriendsStack}
        options={({ route }) => ({
          tabBarStyle: getTabBarStyle(route),
          tabBarItemStyle: getTabBarItemStyle(route),
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                name={focused ? 'account-group' : 'account-group-outline'}
                size={28}
                color={color}
              />
              {requests.length > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -8,
                    top: -6,
                    backgroundColor: '#FF3B30',
                    borderRadius: 12,
                    minWidth: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 6,
                    borderWidth: 2,
                    borderColor: theme.colors.bottomNavBackground,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      fontWeight: '700',
                      lineHeight: 14,
                    }}
                  >
                    {requests.length > 99 ? '99+' : requests.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        })}
      />
      <Tabs.Screen
        name={tabNames.SETTINGS}
        component={SettingsStack}
        options={({ route }) => ({
          tabBarStyle: getTabBarStyle(route),
          tabBarItemStyle: getTabBarItemStyle(route),
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon
                name={focused ? 'cog' : 'cog-outline'}
                size={28}
                color={color}
              />
            </View>
          ),
        })}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
