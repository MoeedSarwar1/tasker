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

const SettingsScreen = () => {
  const { showModal } = useModal();
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();

  const styles = friendsStyles();
  return (
    <>
      <Header title="Account Settings" />

      <View style={styles.container}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom:
              Platform.OS === 'ios' ? insets.bottom + 38 : insets.bottom + 16,
          }}
        >
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
