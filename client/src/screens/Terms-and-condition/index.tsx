import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { termsConditionsStyles } from './styles';
import { useTheme } from '../../context/Theme-context';

const TermsConditionsScreen = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = termsConditionsStyles(theme);

  const termsData = [
    {
      id: 1,
      title: 'Acceptance of Terms',
      description:
        'By downloading, installing, or using Tasuku, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the application.',
    },
    {
      id: 2,
      title: 'Description of Service',
      description:
        'Tasuku is a task management application that helps users organize, track, and manage their personal and professional tasks. The service includes task creation, editing, categorization, and synchronization across devices.',
    },
    {
      id: 3,
      title: 'User Accounts',
      description:
        'You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
    },
    {
      id: 4,
      title: 'Acceptable Use',
      description:
        'You agree to use Tasuku only for lawful purposes and in accordance with these Terms. You may not use the service to store, share, or transmit any content that is illegal, harmful, threatening, abusive, or violates any third-party rights.',
    },
    {
      id: 5,
      title: 'User Content',
      description:
        'You retain ownership of all content you create in Tasuku, including tasks, notes, and other data. You grant us a limited license to store, process, and display your content solely for the purpose of providing the service.',
    },
    {
      id: 6,
      title: 'Intellectual Property',
      description:
        'Tasuku and its original content, features, and functionality are owned by the company and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.',
    },
    {
      id: 7,
      title: 'Service Availability',
      description:
        'We strive to maintain high availability of Tasuku, but we cannot guarantee uninterrupted service. We may temporarily suspend access for maintenance, updates, or technical issues.',
    },
    {
      id: 8,
      title: 'Data Backup and Loss',
      description:
        'While we implement backup systems, you are responsible for maintaining your own backup of important data. We are not liable for any data loss that may occur.',
    },
    {
      id: 9,
      title: 'Premium Features',
      description:
        'Certain advanced features may require a premium subscription. Subscription fees are charged in advance and are non-refundable except as required by applicable law.',
    },
    {
      id: 10,
      title: 'Limitation of Liability',
      description:
        'To the maximum extent permitted by law, Tasuku shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.',
    },
    {
      id: 11,
      title: 'Termination',
      description:
        'We may terminate or suspend your account and access to Tasuku immediately, without prior notice, if you breach these Terms. You may also terminate your account at any time through the app settings.',
    },
    {
      id: 12,
      title: 'Changes to Terms',
      description:
        'We reserve the right to modify these Terms at any time. We will notify users of significant changes through the app or email. Continued use of Tasuku after changes constitutes acceptance of the new Terms.',
    },
    {
      id: 13,
      title: 'Governing Law',
      description:
        'These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or use of Tasuku shall be resolved through appropriate legal channels.',
    },
    {
      id: 14,
      title: 'Contact Information',
      description:
        'For questions about these Terms and Conditions, please contact us at legal@tasuku.app or through the support section in the app.',
    },
  ];

  return (
    <>
      <View style={styles.headerSection}>
        <Text
          style={[
            styles.lastUpdated,
            { color: theme.colors.subtitleTextColor },
          ]}
        >
          Last updated: September 2025
        </Text>
        <Text
          style={[styles.introText, { color: theme.colors.subtitleTextColor }]}
        >
          Welcome to Tasuku! These Terms and Conditions govern your use of our
          task management application. Please read these terms carefully before
          using our service.
        </Text>
      </View>

      {termsData.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <Text
            style={[styles.itemTitle, { color: theme.colors.headerTextColor }]}
          >
            {item.id}. {item.title}
          </Text>
          <Text
            style={[
              styles.itemDescription,
              { color: theme.colors.subtitleTextColor },
            ]}
          >
            {item.description}
          </Text>
        </View>
      ))}

      <View style={styles.footerSection}>
        <Text
          style={[styles.footerText, { color: theme.colors.subtitleTextColor }]}
        >
          If you have any questions about these Terms and Conditions, please
          don't hesitate to contact our support team. Thank you for choosing
          Tasuku for your task management needs.
        </Text>
      </View>
    </>
  );
};

export default TermsConditionsScreen;
