import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useTheme } from '../../context/Theme-context';
import Button from '../Button';
import { contactStyles } from './styles';

const ContactForm = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const styles = contactStyles(theme);

  const handleSubmit = () => {
    // Handle form submission
    console.log({ name, email, message });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input]}
        placeholder="Name"
        placeholderTextColor={theme.colors.placeholderTextColor} // ✅ correct
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input]}
        placeholder="Email"
        placeholderTextColor={theme.colors.placeholderTextColor} // ✅ correct
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input]}
        placeholder="Message"
        placeholderTextColor={theme.colors.placeholderTextColor} // ✅ correct
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
        textStyle={styles.buttonText}
        style={styles.button}
      />
    </View>
  );
};

export default ContactForm;
