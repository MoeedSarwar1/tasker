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
import { register } from '../../network/Auth';
import { registerationStyles } from './styles';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // case-insensitive

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showModal } = useModal();
  const { theme, toggleTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = registerationStyles(theme);

  const [isHidden, setIsHidden] = useState(true);
  const handleRegister = async () => {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    // ✅ Basic validation
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

    // ✅ Validate email format
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
      // ✅ Call register API with trimmed values
      const data = await register(
        trimmedFirst,
        trimmedLast,
        trimmedEmail,
        trimmedPass,
      );

      if (data?.primaryButtonTextuser) {
        showModal({
          iconName: 'checkbox-marked-circle-outline',
          iconColor: '#28A745',
          mode: 'success',
          buttonRow: false,
          title: 'All Set',
          description: 'Account created successfully',
        });
        navigation.goBack();
      }
    } catch (error: any) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        iconColor: '#DC3545',
        title: 'Something Went Wrong,',
        description: 'Signup failed. Please try again.',
        buttonRow: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const onLinkPress = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
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
            placeholder="First Name"
            placeholderTextColor={theme.colors.placeholderTextColor} // ✅ correct
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            placeholderTextColor={theme.colors.placeholderTextColor} // ✅ correct
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.placeholderTextColor} // ✅ correct
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.input}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.colors.placeholderTextColor} // ✅ correct
              value={password}
              style={{ flex: 1 }}
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

        <Button
          title={loading ? '' : 'Register'}
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={handleRegister}
        />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <LinkText
            onPress={onLinkPress}
            text="Welcome Back!"
            pressableText="Login"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
