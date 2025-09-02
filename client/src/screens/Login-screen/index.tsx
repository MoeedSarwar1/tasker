import { Alert, Image, Text, TextInput, View } from 'react-native';
import loginStyles from './styles';
import React from 'react';
import Button from '../../Components/Button';
import LinkText from '../../Components/link-text';
import { useNavigation } from '@react-navigation/native';
import { NavigationRoutes } from '../../navigation/enums';
import { useAuth } from '../../context/Auth-context';
import useApi from '../../network/useApi';

const LoginScreen = () => {
  const styles = loginStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  const { login } = useAuth();
  const { loginUser } = useApi();

  const onLinkPress = () => {
    navigation.navigate(NavigationRoutes.REGISTER as never);
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password, '/users');
      console.log(data);
      if (data.token) {
        login(data.user, data.token);
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Login Error', (error as any).message || 'Unknown error');
    }
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
      <Button title="Login" onPress={() => handleLogin(email, password)} />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <LinkText
          onPress={() => onLinkPress()}
          text="Don't have an account?"
          pressableText="Sign Up"
        />
      </View>
    </View>
  );
};
export default LoginScreen;
