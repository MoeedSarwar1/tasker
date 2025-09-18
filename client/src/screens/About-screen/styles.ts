import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

export const aboutStyles = (theme: Theme) =>
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
      marginHorizontal: 24,
      marginTop: 20,
      borderRadius: 24,
      padding: 32,
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyles: {
      width: '80%', // take 80% of parent width
      height: undefined, // let aspect ratio decide height
      aspectRatio: 250 / 160, // keep your logo’s ratio
      alignSelf: 'center',
    },
    appName: {
      ...typography.header,
      color: theme.colors.headerText,
      fontWeight: '700',
      marginBottom: 4,
    },
    version: {
      ...typography.small,
      color: theme.colors.secondaryIcon,
      marginBottom: 8,
    },
    tagline: {
      ...typography.body,
      color: theme.colors.primaryIcon,
      fontWeight: '600',
      marginBottom: 16,
      textAlign: 'center',
    },
    heroDescription: {
      ...typography.body,
      color: theme.colors.descriptionText,
      textAlign: 'center',
      lineHeight: 24,
    },

    // Common Section Styles
    section: {
      marginHorizontal: 24,
      marginTop: 24,
    },
    card: {
      backgroundColor: theme.colors.cardBackground,
      marginHorizontal: 24,
      marginTop: 24,
      borderRadius: 16,
      padding: 20,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    sectionHeader: {
      marginBottom: 12,
    },
    sectionTitle: {
      ...typography.h3,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 16,
    },
    paragraph: {
      ...typography.body,
      color: theme.colors.descriptionText,
      lineHeight: 24,
      marginBottom: 12,
    },

    // Features Section
    featureItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 20,
      paddingVertical: 8,
    },
    featureIconContainer: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 24,
    },
    featureContent: {
      flex: 1,
      paddingTop: 2,
    },
    featureTitle: {
      ...typography.body,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 4,
    },
    featureDescription: {
      ...typography.small,
      color: theme.colors.descriptionText,
      lineHeight: 20,
    },

    // Team Section
    teamContainer: {
      gap: 16,
    },
    teamMember: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      padding: 16,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
    },
    teamAvatar: {
      fontSize: 32,
      marginRight: 24,
    },
    teamInfo: {
      flex: 1,
    },
    teamName: {
      ...typography.body,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 2,
    },
    teamRole: {
      ...typography.small,
      color: theme.colors.secondaryIcon,
    },

    // Social Links Section
    socialLink: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    socialIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: theme.colors.primaryButtonBackground + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 24,
    },
    socialContent: {
      flex: 1,
    },
    socialTitle: {
      ...typography.body,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 2,
    },
    socialSubtitle: {
      ...typography.small,
      color: theme.colors.descriptionText,
    },

    // Stats Section
    statsCard: {
      backgroundColor: theme.colors.primaryButtonBackground + '10',
      marginHorizontal: 24,
      marginTop: 24,
      borderRadius: 20,
      padding: 24,
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
      ...typography.h2,
      color: theme.colors.primaryIcon,
      fontWeight: '700',
      marginBottom: 4,
    },
    statLabel: {
      ...typography.micro,
      color: theme.colors.secondaryIcon,
      textAlign: 'center',
      fontWeight: '500',
    },
    statDivider: {
      width: 1,
      height: 40,
      backgroundColor: theme.colors.border,
      opacity: 0.5,
    },

    // Footer Section
    footer: {
      alignItems: 'center',
      marginTop: 32,
      paddingHorizontal: 24,
      paddingVertical: 24,
    },
    footerText: {
      ...typography.body,
      color: theme.colors.descriptionText,
      textAlign: 'center',
      marginBottom: 8,
    },
    copyright: {
      ...typography.micro,
      color: theme.colors.placeholderTextColor,
      textAlign: 'center',
    },

    // Legacy styles (for backward compatibility)
    title: {
      color: theme.colors.headerText,
      marginBottom: 4,
      ...typography.header,
    },
    subtitle: {
      ...typography.title,
      color: theme.colors.subtitleTextColor,
      marginBottom: 20,
    },
    linksContainer: {
      marginTop: 20,
      gap: 10,
    },
    link: {
      fontWeight: 'semibold',
      color: theme.colors.linkText,
      ...typography.small,
    },
  });
