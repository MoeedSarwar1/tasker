import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';

const cardStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 16,
      borderColor: theme.colors.border,
      padding: 17,
      marginHorizontal: 24,
      ...shadows.medium,
    },
    title: {
      color: theme.colors.headerText,
      marginBottom: theme.spacing.xs,
      ...typography.title,
    },
    description: {
      color: theme.colors.subtitleTextColor,
      marginBottom: 4,
      ...typography.small,
    },
    date: {
      alignItems: 'flex-end',
    },
    header: {
      gap: 8,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    footer: {
      paddingTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 17,
    },
    details: {
      color: theme.colors.descriptionText,
      ...typography.micro,
    },
    user: {
      ...typography.small,
      color: theme.colors.subtitleTextColor,
    },
  });
export default cardStyles;
