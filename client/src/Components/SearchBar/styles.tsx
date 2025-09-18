import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { scale, verticalScale } from 'react-native-size-matters';

const searchBarStyles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      flexDirection: 'row-reverse',
      marginHorizontal: scale(theme.spacing.lg),
      gap: theme.spacing.sm,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.xl,
      color: theme.colors.inputTextColor,
      padding:scale( theme.spacing.md),
      marginBottom: verticalScale( theme.spacing.md),
    },
  });
export default searchBarStyles;
