import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useLayoutEffect } from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../Components/Header/Header';
import { useTheme } from '../../context/Theme-context';
import { aboutStyles } from './styles';

const AboutScreen = () => {
  const { theme, isDark } = useTheme();
  const styles = aboutStyles(theme);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
    });

    // Restore tab bar when leaving the screen
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          {
            backgroundColor: theme.colors.headerBackground,
            borderTopWidth: 0,
            paddingTop: 0,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          },
          Platform.OS === 'android' && {
            height: 75,
            elevation: 0, // Remove Android elevation shadow
            shadowOpacity: 0, // Remove iOS shadow
          },
        ].filter(Boolean),
        tabBarItemStyle: Platform.select({
          android: {
            height: 47,
            paddingVertical: 0,
            marginVertical: 4,
          },
          ios: {
            height: 50,
            paddingTop: 5,
          },
        }),
      });
    };
  }, [navigation]);

  const features = [
    {
      icon: 'lightning-bolt',
      title: 'Fast Task Creation',
      description: 'Quick capture with intuitive gestures',
    },
    {
      icon: 'tag-multiple',
      title: 'Smart Organization',
      description: 'Labels, priorities, and custom categories',
    },
    {
      icon: 'palette',
      title: 'Beautiful Themes',
      description: 'Light & dark modes with frosted glass effects',
    },
    {
      icon: 'gesture-swipe',
      title: 'Smooth Experience',
      description: 'Native performance with delightful animations',
    },
  ];

  const socialLinks = [
    {
      icon: 'email',
      title: 'Contact Support',
      subtitle: 'Get help when you need it',
      action: () => Linking.openURL('mailto:support@tasuku.app'),
    },
    {
      icon: 'github',
      title: 'GitHub',
      subtitle: 'View source code & contribute',
      action: () => Linking.openURL('https://github.com/your-repo'),
    },
    {
      icon: 'web',
      title: 'Official Website',
      subtitle: 'Learn more about Tasuku',
      action: () => Linking.openURL('https://tasuku.app'),
    },
    {
      icon: 'star',
      title: 'Rate Us',
      subtitle: 'Leave a review on the App Store',
      action: () => Linking.openURL('https://apps.apple.com'),
    },
  ];

  const teamMembers = [
    { name: 'Alex Chen', role: 'Lead Developer', avatar: '👨‍💻' },
    { name: 'Sarah Kim', role: 'UI/UX Designer', avatar: '👩‍🎨' },
    { name: 'Mike Johnson', role: 'Product Manager', avatar: '👨‍💼' },
  ];

  return (
    <>
      <Header title="About" showBack iconName="arrow-back" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* App Hero Section */}
        <View style={styles.heroCard}>
          <View style={styles.logoContainer}>
            {isDark ? (
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.imageStyles}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('../../../assets/images/logoDark.png')}
                style={styles.imageStyles}
                resizeMode="contain"
              />
            )}
          </View>
          <Text style={styles.appName}>Tasuku</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.tagline}>Organize • Focus • Achieve</Text>
          <Text style={styles.heroDescription}>
            A minimal, modern task manager designed to simplify how you capture,
            organize, and complete tasks. We keep distractions out so you can
            focus on what matters most.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ What makes us special</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Icon
                  name={feature.icon}
                  size={24}
                  color={theme.colors.primaryIcon}
                />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Mission Section */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🎯 Our Mission</Text>
          </View>
          <Text style={styles.paragraph}>
            We believe productivity apps should be both powerful and delightful.
            Tasuku is crafted by developers who understand the importance of
            staying organized without sacrificing user experience.
          </Text>
          <Text style={styles.paragraph}>
            Every animation, every transition, every interaction is thoughtfully
            designed to help you stay motivated and accomplish your goals.
          </Text>
        </View>

        {/* Team Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>👥 Meet the Team</Text>
          <View style={styles.teamContainer}>
            {teamMembers.map((member, index) => (
              <View key={index} style={styles.teamMember}>
                <Text style={styles.teamAvatar}>{member.avatar}</Text>
                <View style={styles.teamInfo}>
                  <Text style={styles.teamName}>{member.name}</Text>
                  <Text style={styles.teamRole}>{member.role}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Social Links Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌐 Connect with us</Text>
          {socialLinks.map((link, index) => (
            <Pressable
              key={index}
              style={styles.socialLink}
              onPress={link.action}
            >
              <View style={styles.socialIconContainer}>
                <Icon
                  name={link.icon}
                  size={20}
                  color={theme.colors.primaryIcon}
                />
              </View>
              <View style={styles.socialContent}>
                <Text style={styles.socialTitle}>{link.title}</Text>
                <Text style={styles.socialSubtitle}>{link.subtitle}</Text>
              </View>
              <Icon
                name="chevron-right"
                size={20}
                color={theme.colors.secondaryIcon}
              />
            </Pressable>
          ))}
        </View>

        {/* Stats Section */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>📊 By the numbers</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Active Users</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50K+</Text>
              <Text style={styles.statLabel}>Tasks Completed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>App Store Rating</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ for productivity enthusiasts
          </Text>
          <Text style={styles.copyright}>
            © 2024 Tasuku. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default AboutScreen;
