import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FriendsCard from '../../Components/FriendsCard';
import Header from '../../Components/Header/Header';
import { ToggleButton } from '../../Components/Toggle';
import { useAuth } from '../../context/Auth-context';
import { useModal } from '../../context/Modal-context';
import { useTheme } from '../../context/Theme-context';
import settingStyles from './styles';
import { NavigationRoutes } from '../../navigation/enums';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const { showModal } = useModal();
  const { logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [loggingOut, setLoggingOut] = React.useState(false);
  const styles = settingStyles(Platform, insets, theme);
  const navigation = useNavigation();

  const settingsOptions = [
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'bell-outline',
      hasToggle: true,
      isToggled: true, // You can connect this to state
      onPress: () => {
        // Handle notifications toggle
        console.log('Toggle notifications');
      },
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: 'shield-outline',
      hasArrow: true,
      onPress: () => {
        // Navigate to privacy settings
        navigation.navigate(NavigationRoutes.PRIVACY);
      },
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      hasArrow: true,
      onPress: () => {
        // Navigate to help
        console.log('Navigate to help');
      },
    },
    {
      id: 'about',
      title: 'About',
      icon: 'information-outline',
      hasArrow: true,
      onPress: () => {
        navigation.navigate(NavigationRoutes.ABOUT);
      },
    },
  ];

  if (loggingOut) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primaryIcon} />
        <Text style={styles.loadingText}>Logging out...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Section */}
        <View>
          <Text style={styles.headerTitle}>Profile</Text>
          <FriendsCard item={user} buttons={false} />
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingsCard}>
            <Pressable onPress={toggleTheme} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Icon
                    name={isDark ? 'weather-night' : 'weather-sunny'}
                    size={20}
                    color={theme.colors.primaryIcon}
                  />
                </View>
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <ToggleButton
                isToggled={isDark}
                onToggle={toggleTheme}
                activeIcon="weather-night"
                inactiveIcon="weather-sunny"
                activeIconColor="#FFD700"
                inactiveIconColor="#FF6B35"
                iconSize={20}
                animated={true}
                containerStyle={styles.toggleContainer}
                buttonStyle={styles.toggleButton}
              />
            </Pressable>
          </View>
        </View>

        {/* General Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.settingsCard}>
            {settingsOptions.map((option, index) => (
              <Pressable
                key={option.id}
                onPress={option.onPress}
                style={[
                  styles.settingItem,
                  index !== settingsOptions.length - 1 &&
                    styles.settingItemBorder,
                ]}
              >
                <View style={styles.settingLeft}>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={option.icon}
                      size={20}
                      color={theme.colors.primaryIcon}
                    />
                  </View>
                  <Text style={styles.settingText}>{option.title}</Text>
                </View>
                <View style={styles.settingRight}>
                  {option.hasToggle && (
                    <ToggleButton
                      isToggled={option.isToggled}
                      onToggle={option.onPress}
                      iconSize={16}
                      animated={true}
                      containerStyle={styles.toggleContainer}
                      buttonStyle={styles.smallToggleButton}
                    />
                  )}
                  {option.hasArrow && (
                    <Icon
                      name="chevron-right"
                      size={20}
                      color={theme.colors.secondaryIcon}
                    />
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Spacer for logout button */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Logout Button - Fixed at bottom */}
      <View style={styles.logoutContainer}>
        <Pressable
          onPress={() => {
            showModal({
              mode: 'error',
              title: 'Leaving So Soon?',
              iconColor: '#DC3545',
              description:
                'Logging out will end your current session. You will need to sign in again to access your account. Do you want to continue?',
              iconName: 'exit-run',
              onConfirm: () => {
                setLoggingOut(true);
                setTimeout(() => {
                  logout();
                }, 1500);
              },
            });
          }}
          style={styles.logoutButton}
        >
          <Icon name="logout" size={20} color="#DC3545" />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SettingsScreen;
