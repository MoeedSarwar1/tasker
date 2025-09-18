import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

const cardStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 0.5,
      borderRadius: 16,
      borderColor: theme.colors.border,
      marginHorizontal: 24,
      overflow: 'hidden', // Important for gradient to respect border radius
    },
    gradientContainer: {
      flex: 1,
    },
    content: {
      padding: 16,
    },

    title: {
      color: theme.colors.headerText,
      marginBottom: theme.spacing.xs,
      ...typography.titleXL,
    },
    description: {
      color: theme.colors.subtitleTextColor,
      marginBottom: 4,
      ...typography.bodySM,
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
    },
    user: {
      ...typography.captionXS,
      color: theme.colors.subtitleTextColor,
    },
  });
export default cardStyles;
