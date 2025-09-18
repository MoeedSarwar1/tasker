import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { scale, verticalScale } from 'react-native-size-matters';

export const privacyStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: scale(theme.spacing.lg),
    },
    content: {
      paddingBottom: verticalScale(theme.spacing.xl),
    },

    // Hero Section
    heroCard: {
      backgroundColor: theme.colors.cardBackground,
      marginTop: verticalScale(theme.spacing.lg),
      borderRadius: theme.borderRadius.xl,
      padding: scale(theme.spacing.xl),
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: theme.colors.border,
    },
    heroIconContainer: {
      width: scale(80),
      height: verticalScale(80),
      borderRadius: theme.borderRadius.xl,
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: verticalScale(theme.spacing.lg),
    },
    heroTitle: {
      ...typography.headingLG,
      color: theme.colors.headerText,
      marginBottom: verticalScale(theme.spacing.md),
      textAlign: 'center',
    },
    heroDescription: {
      ...typography.captionMD,
      color: theme.colors.descriptionText,
      textAlign: 'center',
      lineHeight: 24,
    },

    // Section Styles
    section: {
      marginTop: verticalScale(theme.spacing.xl),
    },
    sectionTitle: {
      ...typography.titleLG,
      color: theme.colors.headerText,
      marginBottom: verticalScale(theme.spacing.lg),
      fontWeight: '700',
    },

    // Settings Grid
    settingsGrid: {
      gap: scale(theme.spacing.md),
    },
    settingCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.lg,
      padding: scale(theme.spacing.lg),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    settingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: verticalScale(theme.spacing.md),
    },
    settingIconContainer: {
      width: scale(48),
      height: verticalScale(48),
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingTitle: {
      ...typography.titleMD,
      color: theme.colors.headerText,
      marginBottom: 4,
      fontWeight: '600',
    },
    settingDescription: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
      lineHeight: 20,
    },

    // Transparency Grid
    transparencyGrid: {
      gap: scale(theme.spacing.md),
    },
    transparencyCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.lg,
      padding: scale(theme.spacing.lg),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
    },
    transparencyHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(theme.spacing.md),
    },
    transparencyTitle: {
      ...typography.titleMD,
      color: theme.colors.headerText,
      marginLeft: scale(theme.spacing.md),
      fontWeight: '600',
    },
    transparencyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(theme.spacing.sm),
    },
    transparencyText: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
      marginLeft: scale(theme.spacing.md),
      lineHeight: 20,
      flex: 1,
    },

    // Action Cards
    actionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.lg,
      padding: scale(theme.spacing.lg),
      marginBottom: verticalScale(theme.spacing.md),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    destructiveCard: {
      borderColor: '#DC354520',
      backgroundColor: theme.colors.cardBackground,
    },
    actionIconContainer: {
      width: scale(48),
      height: verticalScale(48),
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(theme.spacing.lg),
    },
    destructiveIconContainer: {
      backgroundColor: '#DC354515',
    },
    actionContent: {
      flex: 1,
    },
    actionTitle: {
      ...typography.titleMD,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 4,
    },
    destructiveText: {
      color: '#DC3545',
    },
    actionDescription: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
      lineHeight: 20,
    },

    // Tips Card
    tipsCard: {
      backgroundColor: theme.colors.primaryButtonBackground + '08',
      marginTop: verticalScale(theme.spacing.xl),
      borderRadius: theme.borderRadius.xl,
      padding: scale(theme.spacing.xl),
      borderWidth: 1,
      borderColor: theme.colors.primaryButtonBackground + '20',
    },
    tipsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(theme.spacing.lg),
    },
    tipsTitle: {
      ...typography.titleLG,
      color: theme.colors.headerText,
      marginLeft: scale(theme.spacing.md),
      fontWeight: '600',
    },
    tipItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: verticalScale(theme.spacing.md),
    },
    tipText: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
      marginLeft: scale(theme.spacing.md),
      lineHeight: 22,
      flex: 1,
    },

    // Footer
    footer: {
      alignItems: 'center',
      marginTop: verticalScale(theme.spacing.xl * 1.5),
      paddingVertical: verticalScale(theme.spacing.xl),
    },
    footerLinks: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(theme.spacing.lg),
    },
    footerLink: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: scale(theme.spacing.sm),
    },
    footerDivider: {
      width: 1,
      height: 20,
      backgroundColor: theme.colors.border,
      marginHorizontal: scale(theme.spacing.md),
    },
    footerLinkText: {
      ...typography.captionMD,
      color: theme.colors.primaryIcon,
      fontWeight: '500',
      marginRight: scale(theme.spacing.xs),
    },
    footerText: {
      ...typography.captionSM,
      color: theme.colors.placeholderTextColor,
      textAlign: 'center',
      lineHeight: 20,
    },

    // Common styles (keeping for compatibility)
    card: {
      backgroundColor: theme.colors.cardBackground,
      marginTop: verticalScale(theme.spacing.lg),
      borderRadius: theme.borderRadius.xl,
      padding: scale(theme.spacing.md),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
    },
    sectionHeader: {
      marginBottom: verticalScale(theme.spacing.md),
    },
    paragraph: {
      ...typography.captionXS,
      color: theme.colors.descriptionText,
      lineHeight: 24,
      marginBottom: 12,
    },

    // Legacy styles (keeping for any missed references)
    settingsCard: {
      backgroundColor: theme.colors.cardBackground,
      marginTop: verticalScale(theme.spacing.lg),
      borderRadius: theme.borderRadius.xl,
      padding: scale(theme.spacing.md),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: verticalScale(theme.spacing.md),
      paddingVertical: scale(theme.spacing.sm),
    },
    settingItemBorder: {
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: scale(theme.spacing.md),
    },
    settingContent: {
      flex: 1,
      paddingTop: 2,
    },

    // Info Cards (legacy)
    infoCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.xl,
      padding: scale(theme.spacing.md),
      marginBottom: verticalScale(theme.spacing.md),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
    },
    infoTitle: {
      ...typography.bodyMD,
      color: theme.colors.headerText,
      marginBottom: verticalScale(theme.spacing.md),
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(theme.spacing.xs),
    },
    infoText: {
      ...typography.captionXS,
      color: theme.colors.descriptionText,
      marginLeft: 4,
      lineHeight: 24,
    },

    // Actions Card (legacy)
    actionsCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    actionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.cardBackground,
      marginBottom: verticalScale(theme.spacing.md),
      borderRadius: theme.borderRadius.xl,
      padding: scale(theme.spacing.md),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
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
    destructiveAction: {},

    // Toggle Styles
    toggleContainer: {
      padding: 0,
      backgroundColor: 'transparent',
    },
    toggleButton: {
      padding: 4,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.secondaryButtonBackground,
    },
  });
