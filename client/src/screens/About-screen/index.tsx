import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
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
    const parent = navigation.getParent();
    parent?.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: theme.colors.bottomNavBackground,
          borderTopWidth: 0,
          paddingTop: 12,
          paddingBottom: insets.bottom > 0 ? insets.bottom + 12 : 20,
          paddingHorizontal: 16,
          height: Platform.select({
            android: 75 + (insets.bottom > 0 ? insets.bottom : 0),
            ios: 85 + insets.bottom,
          }),
          // Remove shadows/elevation
          ...Platform.select({
            android: {
              elevation: 0,
            },
            ios: {
              shadowOpacity: 0,
            },
          }),
          // Modern border radius
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
          marginHorizontal: 6,
          borderRadius: 16,
          minHeight: 60,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        },
      });
    };
  }, [navigation, theme.colors.bottomNavBackground, insets.bottom]);

  const features = [
    {
      icon: 'lightning-bolt',
      title: 'Fast Task Creation',
      description: 'Quick capture with intuitive gestures and smart shortcuts',
      color: '#F59E0B',
    },
    {
      icon: 'tag-multiple',
      title: 'Smart Organization',
      description:
        'Labels, priorities, and custom categories for perfect organization',
      color: '#8B5CF6',
    },
    {
      icon: 'palette',
      title: 'Beautiful Themes',
      description:
        'Light & dark modes with frosted glass effects and animations',
      color: '#EC4899',
    },
    {
      icon: 'gesture-swipe',
      title: 'Smooth Experience',
      description: 'Native performance with delightful micro-interactions',
      color: '#10B981',
    },
  ];

  const socialLinks = [
    {
      icon: 'email',
      title: 'Contact Support',
      subtitle: 'Get help when you need it',
      color: '#3B82F6',
      action: () => Linking.openURL('mailto:moeedsarwar112@gmail.com'),
    },
    {
      icon: 'star',
      title: 'Rate Us',
      subtitle: 'Leave a review on the App Store',
      color: '#F59E0B',
      action: () => Linking.openURL('https://apps.apple.com'),
    },
  ];

  return (
    <>
      <Header title="App Info " showBack iconName="arrow-back" />
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
          <Text style={styles.sectionTitle}>What Makes Us Special</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View
                  style={[
                    styles.featureIconContainer,
                    { backgroundColor: feature.color + '15' },
                  ]}
                >
                  <Icon name={feature.icon} size={28} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Mission Section */}
        <View style={styles.missionCard}>
          <View style={styles.missionHeader}>
            <Icon name="target" size={32} color={theme.colors.primaryIcon} />
            <Text style={styles.missionTitle}>Our Mission</Text>
          </View>
          <Text style={styles.missionText}>
            We believe productivity apps should be both powerful and delightful.
            Tasuku is crafted by developers who understand the importance of
            staying organized without sacrificing user experience.
          </Text>
          <Text style={styles.missionText}>
            Every animation, every transition, every interaction is thoughtfully
            designed to help you stay motivated and accomplish your goals.
          </Text>
        </View>

        {/* Social Links Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect with Us</Text>
          {socialLinks.map((link, index) => (
            <Pressable
              key={index}
              style={styles.socialCard}
              onPress={link.action}
            >
              <View
                style={[
                  styles.socialIconContainer,
                  { backgroundColor: link.color + '15' },
                ]}
              >
                <Icon name={link.icon} size={24} color={link.color} />
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

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>
              Made with <Icon name="heart" size={20} color="#EF4444" /> for
              productivity enthusiasts
            </Text>
          </View>
          <Text style={styles.copyright}>
            © 2025 Tasuku. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default AboutScreen;
