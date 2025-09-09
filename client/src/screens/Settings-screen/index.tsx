import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FriendsCard from '../../Components/FriendsCard';
import Header from '../../Components/Header/Header';
import { useAuth } from '../../context/Auth-context';
import { useModal } from '../../context/Modal-context';
import { useTheme } from '../../context/Theme-context';
import friendsStyles from './styles';

const SettingsScreen = () => {
  const { showModal } = useModal();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const styles = friendsStyles(Platform, insets, theme);
  return (
    <>
      <Header title="Account Settings" />

      <View style={styles.container}>
        <FriendsCard item={user} buttons={false} />
        <Pressable onPress={toggleTheme} style={styles.themeButton}>
          <Text style={styles.text}>Toggle Theme</Text>
          <Icon
            name="theme-light-dark"
            size={20}
            color={theme.colors.primaryIcon}
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
                logout();
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
