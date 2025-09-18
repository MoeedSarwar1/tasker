import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { scale, verticalScale } from 'react-native-size-matters';
import { borderRadius } from '../../theme/borderRadius';

const settingStyles = (Platform, insets, theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: verticalScale(theme.spacing.lg),
    },
    scrollContent: {
      paddingBottom: 100, // Space for fixed logout button
    },
    loadingContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: verticalScale(theme.spacing.md),
      color: theme.colors.headerText,
      ...typography.titleMD,
    },

    // Section Styles
    section: {
      marginTop: verticalScale(theme.spacing.lg),
      marginHorizontal: scale(theme.spacing.md),
    },
    headerTitle: {
      color: theme.colors.headerText,
      marginLeft: scale(theme.spacing.md),
      ...typography.titleMD,
      marginBottom: verticalScale(theme.spacing.sm),
    },

    sectionTitle: {
      color: theme.colors.headerText,
      ...typography.titleMD,
      marginBottom: verticalScale(theme.spacing.sm),
      marginHorizontal: scale(theme.spacing.sm),
    },

    // Settings Card Styles
    settingsCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      // Shadow
    },

    // Setting Item Styles
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: scale(theme.spacing.md),
      minHeight: 56,
    },
    settingItemBorder: {
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.border,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.primaryButtonBackground + '15', // 15% opacity
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(theme.spacing.sm),
    },
    settingText: {
      color: theme.colors.headerText,
      ...typography.captionXS,
      fontWeight: '500',
    },

    // Toggle Styles
    toggleContainer: {
      padding: 0,
      backgroundColor: 'transparent',
    },
    toggleButton: {
      padding: scale(theme.spacing.sm),
      borderRadius: theme.borderRadius.xl,
      backgroundColor: theme.colors.secondaryButtonBackground,
    },
    smallToggleButton: {
      padding: scale(theme.spacing.xs),
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.secondaryButtonBackground,
    },

    // Logout Styles
    logoutContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background,
      paddingHorizontal: scale(theme.spacing.md),
      paddingTop: verticalScale(theme.spacing.sm),
      paddingBottom: insets.bottom,
      borderTopWidth: 0.5,
      borderTopColor: theme.colors.border,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DC354515', // Red with 15% opacity
      borderRadius: theme.borderRadius.lg,
      paddingVertical: verticalScale(theme.spacing.sm),
      paddingHorizontal: scale(theme.spacing.md),
      borderWidth: 1,
      borderColor: '#DC354530', // Red with 30% opacity
    },
    logoutText: {
      color: '#DC3545',
      ...typography.buttonLG,
      marginLeft: scale(theme.spacing.sm),
    },

    // Spacer
    spacer: {
      height: verticalScale(theme.spacing.lg),
    },

    // Legacy styles for backward compatibility (remove if not needed)
    text: {
      color: theme.colors.headerText,
      ...typography.body,
      fontWeight: '600',
    },
    themeButton: {
      borderBottomWidth: 0.5,
      borderColor: theme.colors.border,
      marginHorizontal: 24,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoutWrapper: {
      flex: 1,
      marginHorizontal: 24,
      justifyContent: 'flex-end',
      paddingBottom:
        Platform.OS === 'ios' ? insets.bottom + 38 : insets.bottom + 16,
    },
    childrenWrapperStyle: {
      backgroundColor: theme.colors.secondaryButtonBackground,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 2,
      position: 'absolute',
      bottom: 0,
      left: 24,
      right: 24,
    },
  });

export default settingStyles;
