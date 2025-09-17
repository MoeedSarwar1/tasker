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
import { NavigationRoutes } from '../../navigation/enums';
import { register } from '../../network/Auth';
import { registerationStyles } from './styles';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { showModal } = useModal();
  const { theme, toggleTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = registerationStyles(theme);

  // Input validation helper
  const validateInputs = (firstName, lastName, email, password) => {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedFirst || !trimmedLast || !trimmedEmail || !trimmedPass) {
      return { isValid: false, error: 'Please fill all the fields' };
    }

    if (trimmedFirst.length < 2) {
      return {
        isValid: false,
        error: 'First name must be at least 2 characters',
      };
    }

    if (trimmedLast.length < 2) {
      return {
        isValid: false,
        error: 'Last name must be at least 2 characters',
      };
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }

    if (trimmedPass.length < 6) {
      return {
        isValid: false,
        error: 'Password must be at least 6 characters',
      };
    }

    return {
      isValid: true,
      data: { trimmedFirst, trimmedLast, trimmedEmail, trimmedPass },
    };
  };

  const showErrorModal = (title, description, iconName = 'alert-circle') => {
    showModal({
      mode: 'error',
      buttonRow: true,
      iconName,
      iconColor: '#DC3545',
      title,
      description,
    });
  };

  // Separate function to show verification modal (prevents code reset issues)
  const showVerificationModal = email => {
    showModal({
      mode: 'confirmation',
      iconName: 'email-alert-outline',
      iconColor: '#28A745',
      title: 'Verification Code Sent',
      buttonRow: false,
      description: `Please enter the 6-digit verification code sent to ${email}`,
      onConfirm: () =>
        navigation.navigate(NavigationRoutes.VERIFICATION, { email }),
    });
  };

  const handleRegister = async () => {
    // Prevent multiple submissions
    if (loading) return;

    const validation = validateInputs(firstName, lastName, email, password);

    if (!validation.isValid) {
      showErrorModal('Registration Error', validation.error);
      return;
    }

    const { trimmedFirst, trimmedLast, trimmedEmail, trimmedPass } =
      validation.data;

    setLoading(true);

    try {
      const data = await register(
        trimmedFirst,
        trimmedLast,
        trimmedEmail,
        trimmedPass,
      );

      if (data) {
        // Store email for verification
        setEmail(trimmedEmail);
        // Clear the verification code
        showVerificationModal(trimmedEmail);
      }
    } catch (error) {
      console.error('Registration error:', error);

      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Registration failed';

      if (
        errorMessage.toLowerCase().includes('email') ||
        errorMessage.toLowerCase().includes('already exists')
      ) {
        showErrorModal(
          'Email Already Exists',
          'This email is already registered. Please use a different email address.',
          'email-remove-outline',
        );
      } else if (
        errorMessage.toLowerCase().includes('network') ||
        errorMessage.toLowerCase().includes('connection')
      ) {
        showErrorModal(
          'Connection Error',
          'Please check your internet connection and try again.',
          'wifi-alert',
        );
      } else {
        showErrorModal('Registration Failed', errorMessage, 'wifi-alert');
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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        {/* Theme toggle */}
        <View
          style={{
            position: 'absolute',
            top: insets.top + 10,
            right: 20,
            zIndex: 1,
          }}
        >
          <Pressable
            onPress={toggleTheme}
            hitSlop={20}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
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
            autoCapitalize="words"
            autoCorrect={false}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            placeholderTextColor={theme.colors.placeholderTextColor}
            onChangeText={setLastName}
            autoCapitalize="words"
            autoCorrect={false}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.placeholderTextColor}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
          <View
            style={[
              styles.input,
              { flexDirection: 'row', alignItems: 'center' },
            ]}
          >
            <TextInput
              placeholder="Password (min 6 characters)"
              placeholderTextColor={theme.colors.placeholderTextColor}
              value={password}
              style={{ flex: 1, color: theme.colors.inputTextColor }}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
            <Pressable
              onPress={() => setIsPasswordVisible(prev => !prev)}
              hitSlop={10}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                paddingLeft: 10,
              })}
            >
              <Icon
                name={isPasswordVisible ? 'eye' : 'eye-off'}
                size={20}
                color={theme.colors.placeholderTextColor || '#999'}
              />
            </Pressable>
          </View>
        </View>

        {/* Register Button */}
        <Button
          title={loading ? 'Creating Account...' : 'Register'}
          textStyle={styles.buttonText}
          onPress={handleRegister}
          disabled={loading}
          style={loading ? { opacity: 0.6 } : {}}
        />

        {/* Link to Login */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <LinkText
            onPress={() => !loading && navigation.goBack()}
            text="Welcome Back!"
            pressableText="Login"
            disabled={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
