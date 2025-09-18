import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { scale, verticalScale } from 'react-native-size-matters';

const cardStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: scale(theme.borderRadius.md),
      marginHorizontal: scale(theme.spacing.lg),
      overflow: 'hidden', // Important for gradient to respect border radius
    },
    gradientContainer: {
      flex: 1,
    },
    content: {
      padding: scale(theme.spacing.md),
    },

    title: {
      color: theme.colors.headerText,
      marginBottom: verticalScale(theme.spacing.xs),
      ...typography.titleXL,
    },
    description: {
      color: theme.colors.subtitleTextColor,
      marginBottom: verticalScale(theme.spacing.xs),
      ...typography.bodyXS,
    },
    date: {
      alignItems: 'flex-end',
    },
    header: {
      gap: scale(theme.spacing.md),
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    footer: {
      paddingTop: verticalScale(theme.spacing.md),
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
