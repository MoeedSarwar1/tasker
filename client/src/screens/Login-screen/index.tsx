import { Image, Text, TextInput, View } from 'react-native';
import loginStyles from './styles';
import React from 'react';
import Button from '../../Components/Button';
import LinkText from '../../Components/link-text';
import { useNavigation } from '@react-navigation/native';
import { NavigationRoutes } from '../../navigation/enums';

const LoginScreen = () => {
  const styles = loginStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

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
      <Button
        title="Login"
        onPress={() => navigation.navigate(NavigationRoutes.HOME as never)}
      />
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
