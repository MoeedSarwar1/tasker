import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { scale, verticalScale } from 'react-native-size-matters';

export const aboutStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: scale(theme.spacing.lg),
    },
    content: {
      paddingBottom: verticalScale(theme.spacing.xl * 2),
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 5,
    },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: verticalScale(theme.spacing.lg),
    },
    imageStyles: {
      width: '70%',
      height: undefined,
      aspectRatio: 250 / 160,
      alignSelf: 'center',
    },
    appName: {
      ...typography.headingXL,
      color: theme.colors.headerText,
      marginBottom: verticalScale(theme.spacing.xs),
      fontWeight: '800',
    },
    version: {
      ...typography.captionMD,
      color: theme.colors.secondaryIcon,
      marginBottom: verticalScale(theme.spacing.sm),
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      paddingHorizontal: scale(12),
      paddingVertical: scale(4),
      borderRadius: 12,
    },
    tagline: {
      ...typography.titleMD,
      color: theme.colors.primaryIcon,
      marginBottom: verticalScale(theme.spacing.lg),
      textAlign: 'center',
      fontWeight: '600',
    },
    heroDescription: {
      ...typography.captionMD,
      color: theme.colors.descriptionText,
      textAlign: 'center',
      lineHeight: 26,
    },

    // Section Styles
    section: {
      marginTop: verticalScale(theme.spacing.xl),
    },
    sectionTitle: {
      ...typography.titleXL,
      color: theme.colors.headerText,
      marginBottom: verticalScale(theme.spacing.lg),
      fontWeight: '700',
    },

    // Features Grid
    featuresGrid: {
      gap: scale(theme.spacing.md),
    },
    featureCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.lg,
      padding: scale(theme.spacing.lg),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    featureIconContainer: {
      width: scale(56),
      height: verticalScale(56),
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: verticalScale(theme.spacing.md),
    },
    featureTitle: {
      ...typography.titleMD,
      color: theme.colors.headerText,
      marginBottom: verticalScale(theme.spacing.sm),
      fontWeight: '600',
    },
    featureDescription: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
      lineHeight: 22,
    },

    // Mission Card
    missionCard: {
      backgroundColor: theme.colors.primaryButtonBackground + '08',
      marginTop: verticalScale(theme.spacing.xl),
      borderRadius: theme.borderRadius.xl,
      padding: scale(theme.spacing.xl),
      borderWidth: 1,
      borderColor: theme.colors.primaryButtonBackground + '20',
    },
    missionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(theme.spacing.lg),
    },
    missionTitle: {
      ...typography.titleXL,
      color: theme.colors.headerText,
      marginLeft: scale(theme.spacing.md),
      fontWeight: '700',
    },
    missionText: {
      ...typography.captionMD,
      color: theme.colors.descriptionText,
      lineHeight: 26,
      marginBottom: verticalScale(theme.spacing.md),
    },

    // Team Grid
    teamGrid: {
      gap: scale(theme.spacing.md),
    },
    teamCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.lg,
      padding: scale(theme.spacing.lg),
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    teamAvatar: {
      fontSize: 48,
      marginBottom: verticalScale(theme.spacing.md),
    },
    teamName: {
      ...typography.titleMD,
      color: theme.colors.headerText,
      marginBottom: 4,
      fontWeight: '600',
    },
    teamRole: {
      ...typography.captionMD,
      color: theme.colors.primaryIcon,
      marginBottom: verticalScale(theme.spacing.sm),
      fontWeight: '500',
    },
    teamDescription: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
      textAlign: 'center',
      lineHeight: 20,
    },

    // Achievements Grid
    achievementsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: scale(theme.spacing.md),
    },
    achievementCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.lg,
      padding: scale(theme.spacing.lg),
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      flex: 1,
      minWidth: '45%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    achievementIconContainer: {
      width: scale(48),
      height: verticalScale(48),
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: verticalScale(theme.spacing.md),
    },
    achievementNumber: {
      ...typography.headingLG,
      color: theme.colors.primaryIcon,
      marginBottom: 4,
      fontWeight: '800',
    },
    achievementLabel: {
      ...typography.captionMD,
      color: theme.colors.headerText,
      marginBottom: 2,
      fontWeight: '600',
      textAlign: 'center',
    },
    achievementDescription: {
      ...typography.captionXS,
      color: theme.colors.descriptionText,
      textAlign: 'center',
    },

    // Social Cards
    socialCard: {
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
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    socialIconContainer: {
      width: scale(48),
      height: verticalScale(48),
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scale(theme.spacing.lg),
    },
    socialContent: {
      flex: 1,
    },
    socialTitle: {
      ...typography.titleMD,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 2,
    },
    socialSubtitle: {
      ...typography.captionSM,
      color: theme.colors.descriptionText,
    },

    // Footer
    footer: {
      alignItems: 'center',
      marginTop: verticalScale(theme.spacing.xl * 1.5),
      paddingVertical: verticalScale(theme.spacing.xl),
    },
    footerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: verticalScale(theme.spacing.md),
    },
    footerText: {
      ...typography.captionMD,
      color: theme.colors.descriptionText,
      marginLeft: scale(theme.spacing.sm),
      fontWeight: '500',
    },
    copyright: {
      ...typography.captionSM,
      color: theme.colors.placeholderTextColor,
      textAlign: 'center',
    },

    // Legacy styles for compatibility
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
    featureItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: verticalScale(theme.spacing.md),
      paddingVertical: scale(theme.spacing.sm),
    },
    featureContent: {
      flex: 1,
      paddingTop: 2,
    },
    teamContainer: {
      gap: scale(theme.spacing.md),
    },
    teamMember: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      padding: scale(theme.spacing.md),
      borderWidth: 0.5,
      borderColor: theme.colors.border,
    },
    teamInfo: {
      flex: 1,
    },
    socialLink: {
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
    statsCard: {
      backgroundColor: theme.colors.primaryButtonBackground + '10',
      marginTop: verticalScale(theme.spacing.lg),
      borderRadius: theme.borderRadius.xl,
      padding: scale(theme.spacing.lg),
      borderWidth: 1,
      borderColor: theme.colors.primaryButtonBackground + '20',
    },
    statsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      ...typography.captionSM,
      color: theme.colors.primaryIcon,
      marginBottom: verticalScale(theme.spacing.xs),
    },
    statLabel: {
      ...typography.captionXS,
      color: theme.colors.secondaryIcon,
      textAlign: 'center',
    },
    statDivider: {
      width: 1,
      height: 40,
      backgroundColor: theme.colors.border,
      opacity: 0.5,
    },
  });
