import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { scale, verticalScale } from 'react-native-size-matters';

export const taskDetailsStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingBottom: verticalScale(theme.spacing.xxxl),
      paddingHorizontal: scale(theme.spacing.lg),
      paddingTop: verticalScale(theme.spacing.xl),
    },

    // Status Section
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(theme.spacing.xl * 1.5),
      paddingBottom: verticalScale(theme.spacing.lg),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border + '30',
    },
    statusIconContainer: {
      padding: scale(12),
      borderRadius: scale(300),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(theme.spacing.lg),
    },
    statusTextContainer: {
      flex: 1,
    },
    statusLabel: {
      ...typography.captionSM,
      color: theme.colors.secondaryIcon,
      marginBottom: 2,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    statusText: {
      ...typography.titleXL,
      fontWeight: '700',
    },

    // Title Section
    titleSection: {
      marginBottom: verticalScale(theme.spacing.xl),
    },
    titleLabel: {
      ...typography.captionMD,
      color: theme.colors.secondaryIcon,
      marginBottom: verticalScale(theme.spacing.sm),
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      fontWeight: '600',
    },
    title: {
      ...typography.headingXL,
      color: theme.colors.headerText,
      fontWeight: '800',
    },

    // Meta Information Section
    metaSection: {
      marginBottom: verticalScale(theme.spacing.xl * 1.5),
    },
    metaRow: {
      gap: verticalScale(theme.spacing.sm),
      marginBottom: verticalScale(theme.spacing.sm),
    },
    metaItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: scale(theme.spacing.lg),
    },
    metaIconContainer: {
      width: scale(40),
      height: verticalScale(40),
      borderRadius: scale(20),
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(theme.spacing.md),
    },
    metaLabel: {
      ...typography.captionSM,
      color: theme.colors.secondaryIcon,
      marginBottom: 2,
      textTransform: 'uppercase',
      letterSpacing: 0.3,
      fontWeight: '500',
    },
    metaValue: {
      ...typography.titleSM,
      color: theme.colors.headerText,
      fontWeight: '600',
    },

    // Description Section
    descriptionSection: {
      marginBottom: verticalScale(theme.spacing.xl * 1.5),
    },
    descriptionLabel: {
      ...typography.captionMD,
      color: theme.colors.secondaryIcon,
      marginBottom: verticalScale(theme.spacing.md),
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      fontWeight: '600',
    },
    descriptionContainer: {
      backgroundColor: theme.colors.cardBackground + '50',
      borderRadius: theme.borderRadius.lg,
      padding: scale(theme.spacing.lg),
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primaryButtonBackground,
    },
    description: {
      ...typography.bodyMD,
      color: theme.colors.descriptionText,
      lineHeight: 24,
    },

    // Footer Section
    footerSection: {
      marginTop: verticalScale(theme.spacing.xl),
      paddingTop: verticalScale(theme.spacing.lg),
      borderTopWidth: 1,
      borderTopColor: theme.colors.border + '30',
    },
    footerItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    footerText: {
      ...typography.captionSM,
      color: theme.colors.secondaryIcon,
      marginLeft: scale(theme.spacing.sm),
      fontStyle: 'italic',
    },

    // Legacy styles for backward compatibility
    sectionTitle: {
      ...typography.headingXL,
      color: theme.colors.headerText,
      marginBottom: verticalScale(theme.spacing.xs),
    },
    due: {
      color: theme.colors.subtitleTextColor,
      marginBottom: verticalScale(theme.spacing.xs),
      ...typography.bodyXS,
    },
    user: {
      ...typography.captionXS,
      color: theme.colors.subtitleTextColor,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
