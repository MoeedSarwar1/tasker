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
      iconName: 'delete-forever', // material-community icon
      description:
        'Are you absolutely sure? This will permanently delete your account and all data stored on our servers. This action cannot be undone.',
      onConfirm: async () => {
        try {
          // Show loading modal first
          showModal({
            mode: 'loading',
            title: 'Deleting Account',
            iconName: 'progress-clock',
            description:
              'We’re securely removing your account data. Please wait...',
          });

          // Call API to delete account
          await deleteMe();

          // Clear local storage as well
          await AsyncStorage.clear();

          // Show success modal
          showModal({
            mode: 'success',
            title: 'Account Deleted',
            iconName: 'check-circle',
            description:
              'Your account and all associated data have been permanently removed. Logging you out...',
          });

          // Logout after a short delay
          setTimeout(() => {
            logout(); // Replace with your actual logout handler
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
      iconName: 'delete-forever', // material-community icon name
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
      type: 'toggle',
      value: settings.biometricAuth,
      onToggle: () => toggleSetting('biometricAuth'),
    },
    {
      id: 'analytics',
      title: 'Analytics & Usage Data',
      description: 'Help improve Tasuku by sharing anonymous usage data',
      icon: 'chart-line',
      type: 'toggle',
      value: settings.analytics,
      onToggle: () => toggleSetting('analytics'),
    },
    {
      id: 'crashReports',
      title: 'Crash Reports',
      description: 'Automatically send crash reports to help fix bugs',
      icon: 'bug',
      type: 'toggle',
      value: settings.crashReports,
      onToggle: () => toggleSetting('crashReports'),
    },
    {
      id: 'dataSharing',
      title: 'Data Sharing',
      description: 'Share data with third-party services for enhanced features',
      icon: 'share-variant',
      type: 'toggle',
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
      type: 'action',
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

  const dataInfo = [
    {
      title: 'What we collect',
      items: [
        'Tasks and labels you create',
        'App usage patterns (anonymous)',
        'Device information for compatibility',
        'Crash logs for debugging',
      ],
    },
    {
      title: "What we don't collect",
      items: [
        'Personal identification information',
        'Location data (unless enabled)',
        'Third-party app data',
        'Sensitive personal content',
      ],
    },
  ];

  return (
    <>
      <Header title="Privacy & Security" showBack iconName="arrow-back" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Privacy Overview */}
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
            your privacy. Your tasks stay private and secure.
          </Text>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 Privacy Settings</Text>
          <View style={styles.settingsCard}>
            {privacySettings.map((setting, index) => (
              <View
                key={setting.id}
                style={[
                  styles.settingItem,
                  index !== privacySettings.length - 1 &&
                    styles.settingItemBorder,
                ]}
              >
                <View style={styles.settingLeft}>
                  <View style={styles.settingIconContainer}>
                    <Icon
                      name={setting.icon}
                      size={20}
                      color={theme.colors.primaryIcon}
                    />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{setting.title}</Text>
                    <Text style={styles.settingDescription}>
                      {setting.description}
                    </Text>
                  </View>
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
            ))}
          </View>
        </View>

        {/* Data Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Data Transparency</Text>
          {dataInfo.map((info, index) => (
            <View key={index} style={styles.infoCard}>
              <Text style={styles.infoTitle}>{info.title}</Text>
              {info.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.infoItem}>
                  <Icon
                    name="circle-small"
                    size={16}
                    color={theme.colors.primaryIcon}
                  />
                  <Text style={styles.infoText}>{item}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Security Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Data Management</Text>
          <View style={styles.actionsCard}>
            {securityActions.map((action, index) => (
              <Pressable
                key={action.id}
                style={[
                  styles.actionItem,
                  action.type === 'destructive' && styles.destructiveAction,
                  index !== securityActions.length - 1 &&
                    styles.actionItemBorder,
                ]}
                onPress={action.onPress}
              >
                <View style={styles.actionLeft}>
                  <View
                    style={[
                      styles.actionIconContainer,
                      action.type === 'destructive' &&
                        styles.destructiveIconContainer,
                    ]}
                  >
                    <Icon
                      name={action.icon}
                      size={20}
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
                </View>
                <Icon
                  name="chevron-right"
                  size={20}
                  color={theme.colors.secondaryIcon}
                />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Security Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.sectionTitle}>💡 Security Tips</Text>
          <View style={styles.tipItem}>
            <Icon name="lightbulb" size={16} color={theme.colors.primaryIcon} />
            <Text style={styles.tipText}>
              Enable biometric authentication for an extra layer of security
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Icon name="lightbulb" size={16} color={theme.colors.primaryIcon} />
            <Text style={styles.tipText}>
              Regularly review and update your privacy settings
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Icon name="lightbulb" size={16} color={theme.colors.primaryIcon} />
            <Text style={styles.tipText}>
              Export your data regularly to keep local backups
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable style={styles.footerLink}>
            <Text style={styles.footerLinkText}>Privacy Policy</Text>
            <Icon
              name="external-link"
              size={16}
              color={theme.colors.primaryIcon}
            />
          </Pressable>
          <Pressable style={styles.footerLink}>
            <Text style={styles.footerLinkText}>Terms of Service</Text>
            <Icon
              name="external-link"
              size={16}
              color={theme.colors.primaryIcon}
            />
          </Pressable>
          <Text style={styles.footerText}>Last updated: March 2024</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default PrivacySecurityScreen;
