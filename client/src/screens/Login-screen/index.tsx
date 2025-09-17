import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../Components/Button';
import LinkText from '../../Components/link-text';
import Text from '../../Components/Text';
import { useAuth } from '../../context/Auth-context';
import { useModal } from '../../context/Modal-context';
import { useTheme } from '../../context/Theme-context';
import { NavigationRoutes } from '../../navigation/enums';
import client from '../../network/Client';
import { API_ENDPOINTS } from '../../network/Endpoints';
import loginStyles from './styles';

const LoginScreen = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const styles = loginStyles(theme);

  const navigation = useNavigation();
  const { login } = useAuth();
  const { showModal } = useModal();

  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showModal({
        mode: 'error',
        iconName: 'alert-circle',
        iconColor: '#DC3545',
        title: 'Validation Error',
        description: 'Please enter email and password',
        buttonRow: false,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await client.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      const data = response.data;
      if (data.token) {
        login(data.user, data.token); // Save user & token in context
        await AsyncStorage.setItem('accessToken', data.token); // store token
      } else {
        showModal({
          mode: 'error',
          iconName: 'alert-circle',
          iconColor: '#DC3545',
          title: 'Login Failed',
          description: 'Please check your credentials and try again',
          buttonRow: false,
        });
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        showModal({
          mode: 'error',
          buttonRow: true,
          iconName: 'alert-circle',
          iconColor: '#DC3545',
          title: 'Verification Required',
          description: 'Please verify your email to move forward',
          onConfirm: () =>
            navigation.navigate(NavigationRoutes.VERIFICATION, {
              email: email,
            }),
        });

        return;
      }
      showModal({
        mode: 'error',
        iconName: 'alert-circle',
        iconColor: '#DC3545',
        title: 'Login Failed',
        description: 'Please check your credentials and try again',
        buttonRow: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const onLinkPress = () => {
    navigation.navigate(NavigationRoutes.REGISTER as never);
  };

  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        style={styles.containaer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View
          style={{
            position: 'absolute',
            top: insets.top,
            right: insets.left + 32,
          }}
        >
          <Pressable onPress={toggleTheme} hitSlop={20}>
            <Icon
              name="theme-light-dark"
              size={26}
              color={theme.colors.primaryIcon}
            />
          </Pressable>
        </View>

        <View style={styles.logoContainer}>
          {isDark ? (
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.imageStyles}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../../assets/images/logoDark.png')}
              style={styles.imageStyles}
              resizeMode="contain"
            />
          )}
          <Text style={styles.textStyles}>Organize your day,</Text>
          <Text style={styles.textStyles}>Effortlessly</Text>
        </View>

        <View style={styles.inputContaier}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.placeholderTextColor} // ✅ correct
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())} // ✅ force lowercase
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.input}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.colors.placeholderTextColor} // ✅ correct
              value={password}
              style={{ flex: 1, color: theme.colors.inputTextColor }}
              onChangeText={setPassword}
              secureTextEntry={isHidden}
            />
            <Pressable onPress={() => setIsHidden(prev => !prev)}>
              <Icon
                name={isHidden ? 'eye-off' : 'eye'}
                size={16}
                color={theme.colors.primaryIcon}
              />
            </Pressable>
          </View>
        </View>

        <Button
          title={loading ? '' : 'Login'}
          textStyle={styles.buttonText}
          onPress={handleLogin}
        />

        <View style={styles.linkText}>
          <LinkText
            onPress={onLinkPress}
            text="New Here?"
            pressableText="Create an account"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
