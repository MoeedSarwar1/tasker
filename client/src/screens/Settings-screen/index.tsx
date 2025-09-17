import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FriendsCard from '../../Components/FriendsCard';
import Header from '../../Components/Header/Header';
import { useAuth } from '../../context/Auth-context';
import { useModal } from '../../context/Modal-context';
import { useTheme } from '../../context/Theme-context';
import friendsStyles from './styles';
import { typography } from '../../theme/typography';
import { ToggleButton } from '../../Components/Toggle';

const SettingsScreen = () => {
  const { showModal } = useModal();
  const { logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const styles = friendsStyles(Platform, insets, theme);

  if (loggingOut) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primaryIcon} />
        <Text
          style={{
            marginTop: 10,
            color: theme.colors.headerText,
            ...typography.micro,
          }}
        >
          Logging out...
        </Text>
      </View>
    );
  }
  return (
    <>
      <Header title="Account Settings" />

      <View style={styles.container}>
        <FriendsCard item={user} buttons={false} />
        <Pressable onPress={toggleTheme} style={styles.themeButton}>
          <Text style={styles.text}>Toggle Theme</Text>
          <ToggleButton
            isToggled={isDark}
            onToggle={toggleTheme}
            activeIcon="weather-night"
            inactiveIcon="weather-sunny"
            activeIconColor="#FFD700" // Gold for moon
            inactiveIconColor="#FF6B35" // Orange for sun
            iconSize={26}
            animated={true}
            containerStyle={{
              padding: 0,
              backgroundColor: 'transparent',
            }}
            buttonStyle={{
              padding: 8,
              borderRadius: 20,
              backgroundColor: isDark
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.05)',
            }}
          />
        </Pressable>

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
                setLoggingOut(true); // show loader
                setTimeout(() => {
                  logout(); // perform logout after delay
                }, 1500); // 1.5 seconds delay
              },
            });
          }}
          style={styles.childrenWrapperStyle}
        >
          <Text style={styles.text}>Log out</Text>
          <Icon name="exit-to-app" size={20} color={theme.colors.primaryIcon} />
        </Pressable>
      </View>
    </>
  );
};

export default SettingsScreen;
