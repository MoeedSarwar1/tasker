import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

const settingStyles = (Platform, insets, theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
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
      marginTop: 12,
      color: theme.colors.headerText,
      ...typography.body,
    },

    // Section Styles
    section: {
      marginTop: 24,
      marginHorizontal: 16,
    },
    headerTitle: {
      color: theme.colors.headerText,
      marginLeft: 16,
      ...typography.title,
      marginBottom: 12,
    },

    sectionTitle: {
      color: theme.colors.headerText,
      ...typography.title,
      marginBottom: 12,
      marginLeft: 8,
    },

    // Settings Card Styles
    settingsCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 16,
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
      padding: 16,
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
      borderRadius: 8,
      backgroundColor: theme.colors.primaryButtonBackground + '15', // 15% opacity
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    settingText: {
      color: theme.colors.headerText,
      ...typography.body,
      fontWeight: '500',
    },

    // Toggle Styles
    toggleContainer: {
      padding: 0,
      backgroundColor: 'transparent',
    },
    toggleButton: {
      padding: 6,
      borderRadius: 16,
      backgroundColor: theme.colors.secondaryButtonBackground,
    },
    smallToggleButton: {
      padding: 4,
      borderRadius: 12,
      backgroundColor: theme.colors.secondaryButtonBackground,
    },

    // Logout Styles
    logoutContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: Platform.OS === 'ios' ? insets.bottom + 12 : 16,
      borderTopWidth: 0.5,
      borderTopColor: theme.colors.border,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DC354515', // Red with 15% opacity
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderWidth: 1,
      borderColor: '#DC354530', // Red with 30% opacity
    },
    logoutText: {
      color: '#DC3545',
      ...typography.buttonLarge,
      marginLeft: 8,
    },

    // Spacer
    spacer: {
      height: 20,
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
      bottom: 12,
      left: 24,
      right: 24,
    },
  });

export default settingStyles;
