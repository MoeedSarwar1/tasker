import React, { useState } from 'react';
import { TextInput, View, Linking } from 'react-native';
import { useTheme } from '../../context/Theme-context';
import { useModal } from '../../context/Modal-context';
import Button from '../Button';
import { contactStyles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ContactForm = () => {
  const { theme } = useTheme();
  const { showModal } = useModal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const insets = useSafeAreaInsets();
  const styles = contactStyles(theme, insets);

  const handleSubmit = async () => {
    // Validate form
    if (!name.trim() || !email.trim() || !message.trim()) {
      showModal({
        mode: 'error',
        title: 'Missing Information',
        iconName: 'alert-circle',
        description:
          'Please fill in all fields before submitting your message.',
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showModal({
        mode: 'error',
        title: 'Invalid Email',
        iconName: 'alert-circle',
        description: 'Please enter a valid email address.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create email content
      const subject = `Tasuku Contact Form: Message from ${name}`;
      const body = `
Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from Tasuku App
      `;

      // Create mailto URL
      const mailtoUrl = `mailto:moeedsarwar112@gmail.com?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;

      // Check if email client is available
      const supported = await Linking.canOpenURL(mailtoUrl);

      if (supported) {
        await Linking.openURL(mailtoUrl);

        // Show success modal and clear form
        showModal({
          mode: 'success',
          title: 'Email Opened',
          iconName: 'check-circle',
          description:
            'Your email client has been opened. Please send the email to complete your message.',
        });

        // Clear form
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Show error modal for no email client
        showModal({
          mode: 'error',
          title: 'No Email Client',
          iconName: 'mail-outline',
          description:
            'No email client is configured on your device. Please send your message manually to moeedsarwar112@gmail.com',
        });
      }
    } catch (error) {
      console.error('Error opening email client:', error);
      showModal({
        mode: 'error',
        title: 'Email Error',
        iconName: 'alert-circle',
        description:
          'Unable to open email client. Please try again or contact moeedsarwar112@gmail.com directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input]}
        placeholder="Your Name"
        placeholderTextColor={theme.colors.placeholderTextColor}
        value={name}
        onChangeText={setName}
        editable={!isSubmitting}
      />

      <TextInput
        style={[styles.input]}
        placeholder="Your Email"
        placeholderTextColor={theme.colors.placeholderTextColor}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isSubmitting}
      />

      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        placeholderTextColor={theme.colors.placeholderTextColor}
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        editable={!isSubmitting}
      />

      <Button
        title={isSubmitting ? 'Opening Email...' : 'Send Message'}
        onPress={handleSubmit}
        textStyle={styles.buttonText}
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        disabled={isSubmitting}
      />
    </View>
  );
};

export default ContactForm;
