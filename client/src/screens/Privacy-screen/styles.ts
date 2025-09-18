import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

export const privacyStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingBottom: 32,
    },

    // Hero Section
    heroCard: {
      backgroundColor: theme.colors.cardBackground,
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    heroIconContainer: {
      width: 72,
      height: 72,
      borderRadius: 18,
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    heroTitle: {
      ...typography.headingLG,
      color: theme.colors.headerText,
      marginBottom: 8,
      textAlign: 'center',
    },
    heroDescription: {
      ...typography.bodySM,
      color: theme.colors.descriptionText,
      textAlign: 'center',
      lineHeight: 22,
    },

    // Section Styles
    section: {
      marginHorizontal: 16,
      marginTop: 28,
    },
    sectionTitle: {
      ...typography.bodyLG,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 16,
    },

    // Settings Card
    settingsCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 16,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },

    // Setting Items
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      minHeight: 70,
    },
    settingItemBorder: {
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: 16,
    },
    settingIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      ...typography.bodyLG,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 2,
    },
    settingDescription: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
      lineHeight: 18,
    },

    // Info Cards
    infoCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
    },
    infoTitle: {
      ...typography.titleLG,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 12,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    infoText: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
      marginLeft: 4,
      lineHeight: 20,
    },

    // Actions Card
    actionsCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 16,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },

    // Action Items
    actionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      minHeight: 70,
    },
    actionItemBorder: {
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    actionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    actionIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    destructiveIconContainer: {
      backgroundColor: '#DC354515',
    },
    actionContent: {
      flex: 1,
    },
    actionTitle: {
      ...typography.bodyLG,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 2,
    },
    destructiveText: {
      color: '#DC3545',
    },
    actionDescription: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
      lineHeight: 18,
    },
    destructiveAction: {
      // Optional: Add any specific styling for destructive actions
    },

    // Tips Card
    tipsCard: {
      backgroundColor: theme.colors.primaryButtonBackground + '08',
      marginHorizontal: 16,
      marginTop: 28,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.primaryButtonBackground + '20',
    },
    tipItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    tipText: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
      marginLeft: 8,
      lineHeight: 20,
      flex: 1,
    },

    // Footer
    footer: {
      alignItems: 'center',
      marginTop: 32,
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    footerLink: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      marginBottom: 8,
    },
    footerLinkText: {
      ...typography.small,
      color: theme.colors.primaryIcon,
      fontWeight: '500',
      marginRight: 6,
    },
    footerText: {
      ...typography.micro,
      color: theme.colors.placeholderTextColor,
      textAlign: 'center',
      marginTop: 16,
    },

    // Toggle Styles
    toggleContainer: {
      padding: 0,
      backgroundColor: 'transparent',
    },
    toggleButton: {
      padding: 4,
      borderRadius: 12,
      backgroundColor: theme.colors.secondaryButtonBackground,
    },
  });
