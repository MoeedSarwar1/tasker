import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Button from '../../Components/Button';
import LinkText from '../../Components/link-text';
import Text from '../../Components/Text';
import { useModal } from '../../context/Modal-context';
import { NavigationRoutes } from '../../navigation/enums';
import { register } from '../../network/Auth';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showModal } = useModal();

  const handleRegister = async () => {
    // Basic validation
    if (!firstName || !lastName || !email || !password) {
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

    setLoading(true);

    try {
      // Call register API
      const data = await register(firstName, lastName, email, password);

      if (data?.user) {
        showModal({
          iconName: 'checkbox-marked-circle-outline',
          iconColor: '#28A745',
          mode: 'success',
          buttonRow: false,
          title: 'All Set',
          description: 'Account created successfully',
        });
        navigation.goBack(); // Navigate to login screen
      }
    } catch (error: any) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        iconColor: '#DC3545',
        title: 'Something Went Wrong,',
        description: 'Tasks didn’t load. Check your connection and retry.',
        buttonRow: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const onLinkPress = () => {
    navigation.navigate(NavigationRoutes.LOGIN as never);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
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
          placeholder="First Name"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          placeholderTextColor="#999"
          onChangeText={setLastName}
        />
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
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>

      <Button title={loading ? '' : 'Register'} onPress={handleRegister} />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <LinkText
          onPress={onLinkPress}
          text="Welcome Back!"
          pressableText="Login"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#faf9fb',
  },
  input: {
    color: '#333',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContaier: {
    marginTop: 24,
    marginBottom: 32,
  },
  imageStyles: {
    height: 108,
    width: 300,
  },
  textStyles: {
    color: '#4B5563',
  },
});
