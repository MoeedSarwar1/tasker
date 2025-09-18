import { Insets, StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { scale, verticalScale } from 'react-native-size-matters';

const headerStyles = (insets: Insets, theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: scale(theme.spacing.md),
      paddingTop: insets.top,
      backgroundColor: theme.colors.headerBackground,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: theme.colors.headerText,
      ...typography.headingXL,
    },
    subtitle: {
      color: theme.colors.subtitleTextColor,
      ...typography.bodySM,
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: verticalScale(theme.spacing.md),
    },
    backRow: {
      gap: scale(theme.spacing.sm),
    },
  });

export default headerStyles;
