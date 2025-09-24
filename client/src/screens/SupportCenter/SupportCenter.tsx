import React from 'react';
import { ScrollView, View } from 'react-native';
import ContactForm from '../../Components/ContactForm';
import Header from '../../Components/Header/Header';
import Text from '../../Components/Text';
import { useTheme } from '../../context/Theme-context';
import { supportStyles } from './styles';

const SupportCenterScreen = () => {
  const { theme } = useTheme();
  const styles = supportStyles(theme);

  return (
    <>
      <Header showBack iconName="arrow-back" title="Support Center" />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.headerTextColor }]}>
          Frequently Asked Questions
        </Text>
        {/* FAQ items will be added here */}
        <View style={styles.faqItem}>
          <Text
            style={[styles.question, { color: theme.colors.headerTextColor }]}
          >
            How do I reset my password?
          </Text>
          <Text
            style={[styles.answer, { color: theme.colors.subtitleTextColor }]}
          >
            You can reset your password from the login screen by tapping on the
            "Forgot Password" link.
          </Text>
        </View>
        <View style={styles.faqItem}>
          <Text
            style={[styles.question, { color: theme.colors.headerTextColor }]}
          >
            How do I add a new task?
          </Text>
          <Text
            style={[styles.answer, { color: theme.colors.subtitleTextColor }]}
          >
            You can add a new task by tapping the "+" button on the home screen.
          </Text>
        </View>

        <Text
          style={[
            styles.title,
            { color: theme.colors.headerTextColor, marginTop: 20 },
          ]}
        >
          Contact Us
        </Text>
        <ContactForm />
      </ScrollView>
    </>
  );
};

export default SupportCenterScreen;
