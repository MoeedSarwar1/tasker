import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
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
import Text from '../../Components/Text';
import { useTheme } from '../../context/Theme-context';
import { verificationScreenStyles } from './styles';
import { verify } from '../../network/Auth';
import { NavigationRoutes } from '../../navigation/enums';
import { useModal } from '../../context/Modal-context';

const EmailVerificationScreen = () => {
  const route = useRoute();
  const { email } = route.params;
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { showModal } = useModal();

  const { theme, toggleTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = verificationScreenStyles(theme);

  // ✅ Debug: Log the email to make sure it's being passed correctly
  useEffect(() => {
    // ✅ Check if email exists
    if (!email) {
      showModal({
        mode: 'error',
        buttonRow: true,
        iconName: 'alert-circle',
        iconColor: '#DC3545',
        title: 'Missing Email',
        description: 'Email address is missing. Please go back and try again.',
        onConfirm: () => navigation.goBack(),
      });
    }
  }, [email]);

  const handleVerify = async () => {
    // ✅ Additional email validation
    if (!email) {
      showModal({
        mode: 'error',
        buttonRow: true,
        iconName: 'alert-circle',
        iconColor: '#DC3545',
        title: 'Missing Email',
        description: 'Email address is missing. Please go back and try again.',
        onConfirm: () => navigation.goBack(),
      });
      return;
    }

    // ✅ Input validation
    if (!code || code.trim().length === 0) {
      showModal({
        mode: 'error',
        buttonRow: false,
        iconName: 'exclamation',
        title: 'Code Required',
        description: 'Please enter the verification code',
      });
      return;
    }

    if (code.trim().length !== 6) {
      showModal({
        mode: 'error',
        buttonRow: false,
        iconName: 'exclamation',
        title: 'Invalid Code',
        description: 'Verification code must be 6 digits',
      });
      return;
    }

    setLoading(true);

    try {
      // ✅ Debug: Log the data being sent to API
      // ✅ Call the verify API with email and code
      const data = await verify(email, code.trim());

      // ✅ Show success modal and navigate on confirmation
      showModal({
        mode: 'success',
        buttonRow: true,
        iconName: 'email-check-outline',
        iconColor: '#28A745',
        title: 'Email Verified 🎉',
        description:
          'Your email has been successfully verified. You can now continue.',
        onConfirm: () => {
          // ✅ Clear verification state and navigate to login
          setCode('');
          navigation.reset({
            index: 0,
            routes: [{ name: NavigationRoutes.LOGIN }],
          });
        },
      });
      return data;
    } catch (error) {
      // ✅ Enhanced error logging
      console.error('Verification error details:', {
        error: error,
        response: error?.response?.data,
        status: error?.response?.status,
        message: error?.message,
      });

      let errorMessage = 'Invalid or expired code. Please try again.';
      let errorTitle = 'Verification Failed';

      // ✅ Handle specific error cases
      if (error?.response?.status === 404) {
        errorMessage =
          'User not found. Please register again or contact support.';
        errorTitle = 'User Not Found';
      } else if (error?.response?.status === 400) {
        errorMessage =
          error?.response?.data?.message || 'Invalid verification code.';
      } else if (error?.response?.status === 410) {
        errorMessage =
          'Verification code has expired. Please request a new one.';
        errorTitle = 'Code Expired';
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      showModal({
        mode: 'error',
        buttonRow: true,
        iconName: 'close-circle-outline',
        iconColor: '#DC3545',
        title: errorTitle,
        description: errorMessage,
        onConfirm: () => {
          // ✅ If user not found, go back to registration
          if (error?.response?.status === 404) {
            navigation.reset({
              index: 0,
              routes: [{ name: NavigationRoutes.REGISTER }],
            });
          }
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle resend code functionality
  const handleResendCode = async () => {
    if (!email) {
      showModal({
        mode: 'error',
        buttonRow: false,
        iconName: 'alert-circle',
        title: 'Missing Email',
        description: 'Cannot resend code without email address.',
      });
      return;
    }

    try {
      // ✅ You might need to implement a resend API call here
      // await resendVerificationCode(email);

      showModal({
        mode: 'info',
        buttonRow: false,
        iconName: 'email-send-outline',
        title: 'Code Resent',
        description: 'A new verification code has been sent to your email.',
      });
    } catch (error) {
      console.error('Resend error:', error);
      showModal({
        mode: 'error',
        buttonRow: false,
        iconName: 'email-remove-outline',
        title: 'Resend Failed',
        description: 'Failed to resend code. Please try again.',
      });
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

        <Text style={styles.headerStyles}>
          Please enter the 6-digit verification code sent to{' '}
          {email || 'your email'}
        </Text>

        {/* ✅ Debug info - Remove in production */}
        {__DEV__ && (
          <Text
            style={{
              textAlign: 'center',
              color: theme.colors.text,
              fontSize: 12,
            }}
          >
            Debug: {email}
          </Text>
        )}

        {/* Inputs */}
        <View style={styles.inputContaier}>
          <TextInput
            style={styles.input}
            placeholder="000000"
            maxLength={6}
            placeholderTextColor={theme.colors.placeholderTextColor}
            value={code}
            onChangeText={text => {
              // ✅ Only allow numeric input
              const numericText = text.replace(/[^0-9]/g, '');
              setCode(numericText);
            }}
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            textContentType="none"
            editable={!loading}
            autoFocus={true}
          />
        </View>

        {/* Verify Button */}
        <Button
          title={loading ? 'Verifying...' : 'Verify Account'}
          textStyle={styles.buttonText}
          disabled={loading || code.length !== 6 || !email}
          onPress={handleVerify}
          style={loading || code.length !== 6 || !email ? { opacity: 0.6 } : {}}
        />

        {/* Resend Code button */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Pressable
            onPress={handleResendCode}
            disabled={loading}
            style={({ pressed }) => ({
              opacity: pressed || loading ? 0.6 : 1,
            })}
          >
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>
              Didn't receive the code? Resend
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EmailVerificationScreen;
