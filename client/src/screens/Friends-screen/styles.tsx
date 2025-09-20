import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { scale, verticalScale } from 'react-native-size-matters';

const friendsStyles = (theme: Theme, insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    // Search Container
    searchContainer: {
      paddingTop: verticalScale(theme.spacing.md),
    },

    // Minimal Tab Container
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: scale(theme.spacing.lg),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    tab: {
      flex: 1,
      paddingVertical: verticalScale(theme.spacing.md),
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },

    activeTab: {
      borderBottomColor: theme.colors.primaryIcon,
    },

    tabText: {
      ...typography.bodyMD,
      color: theme.colors.subtitleTextColor,
      fontWeight: '500',
    },

    activeTabText: {
      color: theme.colors.primaryIcon,
      fontWeight: '600',
    },

    // Content Container
    contentContainer: {
      flex: 1,
    },

    // Loading Container
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Empty States
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(theme.spacing.xl),
    },

    emptyTitle: {
      ...typography.headingSM,
      color: theme.colors.headerText,
      textAlign: 'center',
      marginTop: verticalScale(theme.spacing.md),
      marginBottom: verticalScale(theme.spacing.xs),
    },

    emptyDescription: {
      ...typography.bodyMD,
      color: theme.colors.subtitleTextColor,
      textAlign: 'center',
      lineHeight: scale(20),
    },

    // Lists
    listContainer: {
      paddingTop: scale(theme.spacing.lg),
      paddingBottom: insets.bottom + verticalScale(100),
      gap: verticalScale(theme.spacing.sm),
    },

    // Simple Add Button
    addButton: {
      position: 'absolute',
      bottom: insets.bottom + verticalScale(24),
      right: scale(24),
      width: scale(56),
      height: scale(56),
      borderRadius: scale(28),
      backgroundColor: theme.colors.floatingButton,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },

    // Bottom Sheet Content
    bottomSheetContent: {
      flex: 1,
      marginTop: verticalScale(theme.spacing.sm),
      marginHorizontal: -verticalScale(theme.spacing.lg),
    },

    searchLoadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: verticalScale(40),
    },

    searchListContainer: {
      paddingTop: scale(theme.spacing.lg),
      paddingBottom: insets.bottom + verticalScale(40),
      gap: verticalScale(theme.spacing.sm),
    },
  });

export default friendsStyles;
