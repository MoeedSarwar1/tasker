import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, View } from 'react-native';
import Button from '../../Components/Button';
import LinkText from '../../Components/link-text';
import { useAuth } from '../../context/Auth-context';
import { NavigationRoutes } from '../../navigation/enums';
import client from '../../network/Client';
import { API_ENDPOINTS } from '../../network/Endpoints';
import loginStyles from './styles';

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
    <View style={styles.containaer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.imageStyles}
        />
        <Text style={styles.textStyles}>Get Things Done,</Text>
        <Text style={styles.textStyles}>Beautifully</Text>
      </View>

      <View style={styles.inputContaier}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Button title={loading ? '' : 'Login'} onPress={handleLogin} />

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <LinkText
          onPress={onLinkPress}
          text="Don't have an account?"
          pressableText="Sign Up"
        />
      </View>
    </View>
  );
};

export default LoginScreen;
