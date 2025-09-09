import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import Header from '../../Components/Header/Header';
import { useAuth } from '../../context/Auth-context';
import { useModal } from '../../context/Modal-context';
import friendsStyles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import FriendsCard from '../../Components/FriendsCard';

const SettingsScreen = () => {
  const { showModal } = useModal();
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const styles = friendsStyles(Platform, insets);
  return (
    <>
      <Header title="Account Settings" />

      <View style={styles.container}>
        <FriendsCard item={user} buttons={false} />
        <SafeAreaView style={styles.logoutWrapper}>
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
            <Icon name="exit-to-app" size={20} color="#F9fafb" />
          </Pressable>
        </SafeAreaView>
      </View>
    </>
  );
};

export default SettingsScreen;
