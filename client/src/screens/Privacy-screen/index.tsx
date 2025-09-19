import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../Components/Header/Header';
import { useModal } from '../../context/Modal-context';
import { useTheme } from '../../context/Theme-context';
import { deleteMe } from '../../network/User';
import { privacyStyles } from './styles';
import { useAuth } from '../../context/Auth-context';

const PrivacySecurityScreen = () => {
  const { theme } = useTheme();
  const styles = privacyStyles(theme);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { showModal } = useModal();
  const { logout } = useAuth();

  // Privacy settings state
  const [settings, setSettings] = useState({
    biometricAuth: true,
    analytics: false,
    crashReports: true,
    dataSharing: false,
    notifications: true,
    locationAccess: false,
  });

  const toggleSetting = key => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const showDeleteAccountAlert = () => {
    showModal({
      mode: 'confirmation',
      title: 'Delete Account',
      iconName: 'delete-forever',
      description:
        'Are you absolutely sure? This will permanently delete your account and all data stored on our servers. This action cannot be undone.',
      onConfirm: async () => {
        try {
          showModal({
            mode: 'loading',
            title: 'Deleting Account',
            iconName: 'progress-clock',
            description:
              "We're securely removing your account data. Please wait...",
          });

          await deleteMe();
          await AsyncStorage.clear();

          showModal({
            mode: 'success',
            title: 'Account Deleted',
            iconName: 'check-circle',
            description:
              'Your account and all associated data have been permanently removed. Logging you out...',
          });

          setTimeout(() => {
            logout();
          }, 1500);
        } catch (error) {
          showModal({
            mode: 'error',
            title: 'Deletion Failed',
            iconName: 'alert-circle',
            description:
              'Something went wrong while deleting your account. Please try again later.',
          });
        }
      },
    });
  };

  const clearDataAlert = () => {
    showModal({
      mode: 'confirmation',
      title: 'Clear All Data',
      iconName: 'delete-forever',
      description:
        'This will remove all tasks, labels, and settings from this device. This action cannot be undone. Do you want to continue?',
      onConfirm: async () => {
        try {
          await AsyncStorage.clear();
          showModal({
            mode: 'success',
            title: 'Data Cleared',
            iconName: 'check-circle',
            description: 'All local data has been removed successfully.',
          });
        } catch (error) {
          showModal({
            mode: 'error',
            title: 'Failed to Clear Data',
            iconName: 'alert-circle',
            description: 'Something went wrong while clearing local data.',
          });
        }
      },
    });
  };

  const privacySettings = [
    {
      id: 'biometricAuth',
      title: 'Biometric Authentication',
      description: 'Use Face ID or fingerprint to secure your tasks',
      icon: 'fingerprint',
      value: settings.biometricAuth,
      onToggle: () => toggleSetting('biometricAuth'),
    },
    {
      id: 'analytics',
      title: 'Analytics & Usage Data',
      description: 'Help improve Tasuku by sharing anonymous usage data',
      icon: 'chart-line',
      value: settings.analytics,
      onToggle: () => toggleSetting('analytics'),
    },
    {
      id: 'crashReports',
      title: 'Crash Reports',
      description: 'Automatically send crash reports to help fix bugs',
      icon: 'bug',
      value: settings.crashReports,
      onToggle: () => toggleSetting('crashReports'),
    },
    {
      id: 'dataSharing',
      title: 'Data Sharing',
      description: 'Share data with third-party services for enhanced features',
      icon: 'share-variant',
      value: settings.dataSharing,
      onToggle: () => toggleSetting('dataSharing'),
    },
  ];

  const securityActions = [
    {
      id: 'exportData',
      title: 'Export My Data',
      description: 'Download all your tasks and settings',
      icon: 'download',
      onPress: () =>
        Alert.alert('Export Data', 'Your data export will be ready shortly.'),
    },
    {
      id: 'clearData',
      title: 'Clear All Data',
      description: 'Remove all tasks and settings from this device',
      icon: 'delete-sweep',
      type: 'destructive',
      onPress: clearDataAlert,
    },
    {
      id: 'deleteAccount',
      title: 'Delete Account',
      description: 'Permanently delete your account and all data',
      icon: 'account-remove',
      type: 'destructive',
      onPress: showDeleteAccountAlert,
    },
  ];

  const dataCategories = [
    {
      title: 'What we collect',
      icon: 'database',
      color: theme.colors.primaryIcon,
      items: [
        'Tasks and labels you create',
        'App usage patterns (anonymous)',
        'Device information for compatibility',
        'Crash logs for debugging',
      ],
    },
    {
      title: "What we don't collect",
      icon: 'shield-check',
      color: '#10B981',
      items: [
        'Personal identification information',
        'Location data (unless enabled)',
        'Third-party app data',
        'Sensitive personal content',
      ],
    },
  ];

  const securityTips = [
    'Enable biometric authentication for an extra layer of security',
    'Regularly review and update your privacy settings',
    'Export your data regularly to keep local backups',
    'Keep your app updated to get the latest security improvements',
  ];

  return (
    <>
      <Header title="Privacy & Security" showBack iconName="arrow-back" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconContainer}>
            <Icon
              name="shield-check"
              size={48}
              color={theme.colors.primaryIcon}
            />
          </View>
          <Text style={styles.heroTitle}>Your Privacy Matters</Text>
          <Text style={styles.heroDescription}>
            We're committed to protecting your data and giving you control over
            your privacy. Your tasks stay private and secure with
            industry-standard encryption.
          </Text>
        </View>

        {/* Privacy Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Controls</Text>
          <View style={styles.settingsGrid}>
            {privacySettings.map(setting => (
              <View key={setting.id} style={styles.settingCard}>
                <View style={styles.settingHeader}>
                  <View style={styles.settingIconContainer}>
                    <Icon
                      name={setting.icon}
                      size={24}
                      color={theme.colors.primaryIcon}
                    />
                  </View>
                  <Switch
                    value={setting.value}
                    onValueChange={setting.onToggle}
                    trackColor={{
                      false: theme.colors.secondaryButtonBackground,
                      true: theme.colors.primaryButtonBackground,
                    }}
                    thumbColor={
                      setting.value ? '#fff' : theme.colors.secondaryIcon
                    }
                  />
                </View>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                <Text style={styles.settingDescription}>
                  {setting.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Data Transparency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Transparency</Text>
          <View style={styles.transparencyGrid}>
            {dataCategories.map((category, index) => (
              <View key={index} style={styles.transparencyCard}>
                <View style={styles.transparencyHeader}>
                  <Icon name={category.icon} size={24} color={category.color} />
                  <Text style={styles.transparencyTitle}>{category.title}</Text>
                </View>
                {category.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.transparencyItem}>
                    <Icon
                      name="circle"
                      size={6}
                      color={theme.colors.primaryIcon}
                    />
                    <Text style={styles.transparencyText}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          {securityActions.map(action => (
            <Pressable
              key={action.id}
              style={[
                styles.actionCard,
                action.type === 'destructive' && styles.destructiveCard,
              ]}
              onPress={action.onPress}
            >
              <View
                style={[
                  styles.actionIconContainer,
                  action.type === 'destructive' &&
                    styles.destructiveIconContainer,
                ]}
              >
                <Icon
                  name={action.icon}
                  size={24}
                  color={
                    action.type === 'destructive'
                      ? '#DC3545'
                      : theme.colors.primaryIcon
                  }
                />
              </View>
              <View style={styles.actionContent}>
                <Text
                  style={[
                    styles.actionTitle,
                    action.type === 'destructive' && styles.destructiveText,
                  ]}
                >
                  {action.title}
                </Text>
                <Text style={styles.actionDescription}>
                  {action.description}
                </Text>
              </View>
              <Icon
                name="chevron-right"
                size={20}
                color={theme.colors.secondaryIcon}
              />
            </Pressable>
          ))}
        </View>

        {/* Security Tips */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Icon
              name="lightbulb-on"
              size={24}
              color={theme.colors.primaryIcon}
            />
            <Text style={styles.tipsTitle}>Security Best Practices</Text>
          </View>
          {securityTips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Icon
                name="check-circle"
                size={16}
                color={theme.colors.primaryIcon}
              />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <Pressable style={styles.footerLink}>
              <Text style={styles.footerLinkText}>Privacy Policy</Text>
              <Icon
                name="arrow-top-right-thin"
                size={16}
                color={theme.colors.primaryIcon}
              />
            </Pressable>
            <View style={styles.footerDivider} />
            <Pressable style={styles.footerLink}>
              <Text style={styles.footerLinkText}>Terms of Service</Text>
              <Icon
                name="arrow-top-right-thin"
                size={16}
                color={theme.colors.primaryIcon}
              />
            </Pressable>
          </View>
          <Text style={styles.footerText}>
            Last updated: March 2025 • Made with security in mind
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default PrivacySecurityScreen;
