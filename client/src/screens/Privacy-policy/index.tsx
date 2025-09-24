import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { privacyPolicyStyles } from './styles';
import { useTheme } from '../../context/Theme-context';

const PrivacyPolicyScreen = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = privacyPolicyStyles(theme);

  const privacyPolicyData = [
    {
      id: 1,
      title: 'Information We Collect',
      description:
        'Tasuku collects information you provide directly, such as when you create an account, add tasks, or contact us for support. This includes your name, email address, and task data you create within the app.',
    },
    {
      id: 2,
      title: 'How We Use Your Information',
      description:
        "We use your information to provide and improve Tasuku's services, including task management features, synchronization across devices, and customer support. We do not sell or share your personal data with third parties for marketing purposes.",
    },
    {
      id: 3,
      title: 'Data Storage and Security',
      description:
        'Your task data is stored securely using industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
    },
    {
      id: 4,
      title: 'Data Sharing',
      description:
        'We do not sell, trade, or otherwise transfer your personal information to third parties. We may share anonymized, aggregated data for analytics purposes to improve our services.',
    },
    {
      id: 5,
      title: 'Your Rights',
      description:
        'You have the right to access, update, or delete your personal information. You can export your task data or delete your account at any time through the app settings or by contacting our support team.',
    },
    {
      id: 6,
      title: 'Cookies and Analytics',
      description:
        'Tasuku may use cookies and similar technologies to improve user experience and gather usage analytics. These help us understand how users interact with our app to make improvements.',
    },
    {
      id: 7,
      title: "Children's Privacy",
      description:
        'Tasuku is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.',
    },
    {
      id: 8,
      title: 'Changes to Privacy Policy',
      description:
        'We may update this Privacy Policy from time to time. We will notify you of any significant changes through the app or via email. Your continued use of Tasuku after such modifications constitutes acceptance of the updated Privacy Policy.',
    },
    {
      id: 9,
      title: 'Contact Information',
      description:
        "If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at privacy@tasuku.app or through the app's support section.",
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
          At Tasuku, we respect your privacy and are committed to protecting
          your personal information. This Privacy Policy explains how we
          collect, use, and safeguard your data when you use our task management
          application.
        </Text>
      </View>

      {privacyPolicyData.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <Text
            style={[styles.itemTitle, { color: theme.colors.headerTextColor }]}
          >
            {item.title}
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
          By using Tasuku, you acknowledge that you have read and understood
          this Privacy Policy and agree to the collection and use of your
          information as described herein.
        </Text>
      </View>
    </>
  );
};

export default PrivacyPolicyScreen;
