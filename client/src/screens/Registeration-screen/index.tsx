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
import { useModal } from '../../context/Modal-context';
import { useTheme } from '../../context/Theme-context';
import { register, verify } from '../../network/Auth';
import { registerationStyles } from './styles';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(''); // ✅ should be string
  const { showModal } = useModal();
  const { theme, toggleTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = registerationStyles(theme);

  const [isHidden, setIsHidden] = useState(true);

  const handleVerify = async (email: string, code: string) => {
    try {
      const data = await verify(email, code);

      showModal({
        mode: 'success',
        buttonRow: true,
        iconName: 'email-check-outline',
        iconColor: '#28A745',
        title: 'Email Verified 🎉',
        description:
          'Your email has been successfully verified. You can now continue.',
        onConfirm: () => navigation.goBack(),
      });

      return data;
    } catch (error: any) {
      showModal({
        mode: 'error',
        buttonRow: true,
        iconName: 'close-circle-outline',
        iconColor: '#DC3545',
        title: 'Verification Failed',
        description:
          error?.response?.data?.message ||
          'Invalid or expired code. Please try again.',
      });
    }
  };

  const handleRegister = async () => {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedFirst || !trimmedLast || !trimmedEmail || !trimmedPass) {
      showModal({
        mode: 'error',
        buttonRow: false,
        iconName: 'exclamation',
        iconColor: '#DC3545',
        title: 'Signup Failed',
        description: 'Please fill all the fields',
      });
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      showModal({
        mode: 'error',
        buttonRow: false,
        iconName: 'email-remove',
        iconColor: '#DC3545',
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
      });
      return;
    }

    setLoading(true);

    try {
      const data = await register(
        trimmedFirst,
        trimmedLast,
        trimmedEmail,
        trimmedPass,
      );

      if (data) {
        // ✅ Pass ReactNode directly instead of function
        showModal({
          mode: 'confirmation',
          iconName: 'email-alert-outline',
          iconColor: '#28A745',
          title: 'Verification Code Sent',
          description: `Please enter the verification code sent to ${trimmedEmail}`,
          children: (
            <TextInput
              style={styles.input}
              placeholder="Verification Code"
              placeholderTextColor={theme.colors.placeholderTextColor}
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
            />
          ),
          onConfirm: async () => {
            if (!code.trim()) {
              return showModal({
                mode: 'error',
                iconName: 'alert-circle',
                iconColor: '#DC3545',
                title: 'Code Required',
                description: 'Please enter the verification code first.',
              });
            }
            await handleVerify(trimmedEmail, code);
          },
        });
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error.message;

      if (errorMessage?.toLowerCase().includes('email')) {
        showModal({
          mode: 'error',
          iconName: 'email-remove-outline',
          iconColor: '#DC3545',
          title: 'Email Already Exists',
          description: 'Please use a different email address.',
          buttonRow: false,
        });
      } else {
        showModal({
          mode: 'error',
          iconName: 'wifi-alert',
          iconColor: '#DC3545',
          title: 'Something Went Wrong',
          description: 'Signup failed. Please try again.',
          buttonRow: false,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        {/* Theme toggle */}
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

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={
              isDark
                ? require('../../../assets/images/logo.png')
                : require('../../../assets/images/logoDark.png')
            }
            style={styles.imageStyles}
            resizeMode="contain"
          />
          <Text style={styles.textStyles}>Organize your day,</Text>
          <Text style={styles.textStyles}>Effortlessly</Text>
        </View>

        {/* Inputs */}
        <View style={styles.inputContaier}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor={theme.colors.placeholderTextColor}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            placeholderTextColor={theme.colors.placeholderTextColor}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.placeholderTextColor}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.input}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.colors.placeholderTextColor}
              value={password}
              style={{ flex: 1, color: theme.colors.inputTextColor }}
              onChangeText={setPassword}
              secureTextEntry={isHidden}
            />
            <Pressable onPress={() => setIsHidden(prev => !prev)}>
              <Icon
                name={isHidden ? 'eye-off' : 'eye'}
                size={16}
                color="#999"
              />
            </Pressable>
          </View>
        </View>

        {/* Register Button */}
        <Button
          title={loading ? '' : 'Register'}
          textStyle={styles.buttonText}
          onPress={handleRegister}
        />

        {/* Link to Login */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <LinkText
            onPress={() => navigation.goBack()}
            text="Welcome Back!"
            pressableText="Login"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
