import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';

const searchBarStyles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      flexDirection: 'row-reverse',
      marginHorizontal: 24,
      gap: theme.spacing.sm,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.xl,
      color: theme.colors.inputTextColor,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
  });
export default searchBarStyles;
