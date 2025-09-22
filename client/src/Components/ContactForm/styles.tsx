import { StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

export const contactStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
    },
    messageInput: {
      height: 150,
      textAlignVertical: 'top',
      paddingTop: 15,
    },
    input: {
      flexDirection: 'row',
      gap: scale(theme.spacing.sm),
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: scale(theme.borderRadius.xl),
      color: theme.colors.inputTextColor,
      padding: moderateScale(theme.spacing.md),
      marginBottom: verticalScale(theme.spacing.md),
    },
    buttonText: {
      color: theme.colors.primaryButtonText,
      ...typography.buttonLG,
    },
    button: {
      borderRadius: scale(theme.borderRadius.xl),
      paddingVertical: verticalScale(12),
    },
  });
