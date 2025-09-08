import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import Button from '../../Components/Button';
import LinkText from '../../Components/link-text';
import Text from '../../Components/Text';
import { useAuth } from '../../context/Auth-context';
import { useModal } from '../../context/Modal-context';
import { NavigationRoutes } from '../../navigation/enums';
import client from '../../network/Client';
import { API_ENDPOINTS } from '../../network/Endpoints';
import loginStyles from './styles';

const LoginScreen = () => {
  const styles = loginStyles();
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
        iconName: 'exclamation',
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
          iconName: 'exclamation',
          iconColor: '#DC3545',
          title: 'Login Failed',
          description: 'Please check your credentials and try again',
          buttonRow: false,
        });
      }
    } catch (error: any) {
      showModal({
        mode: 'error',
        iconName: 'exclamation',
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

  return (
    <View style={{ flex: 1, backgroundColor: '#faf9fb' }}>
      <KeyboardAvoidingView
        style={styles.containaer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
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
          <View style={styles.input}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
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

        <Button title={loading ? '' : 'Login'} onPress={handleLogin} />

        <View style={{ alignItems: 'center', marginTop: 20 }}>
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
