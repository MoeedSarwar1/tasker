import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import Button from '../../Components/Button';
import LinkText from '../../Components/link-text';
import { useAuth } from '../../context/Auth-context';
import { NavigationRoutes } from '../../navigation/enums';
import client from '../../network/Client';
import { API_ENDPOINTS } from '../../network/Endpoints';
import loginStyles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = () => {
  const styles = loginStyles();
  const navigation = useNavigation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter email and password');
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
        console.log('Logged in as:', data.user);
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      Alert.alert(
        'Login Error',
        error?.response?.data?.message || error.message || 'Unknown error',
      );
    } finally {
      setLoading(false);
    }
  };

  const onLinkPress = () => {
    navigation.navigate(NavigationRoutes.REGISTER as never);
  };

  return (
    <KeyboardAvoidingView
      style={styles.containaer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.imageStyles}
        />
        <Text style={styles.textStyles}>Organize your day,</Text>
        <Text style={styles.textStyles}>Effortlessly</Text>
      </View>

      <View style={styles.inputContaier}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Button title={loading ? '' : 'Login'} onPress={handleLogin} />

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <LinkText
          onPress={onLinkPress}
          text="New Here?"
          pressableText="Create an account"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
