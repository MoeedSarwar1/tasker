import { Theme } from '../../theme/theme.interface';
import { StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const registerationStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: scale(theme.spacing.lg),
      justifyContent: 'center',
      flex: 1,
      backgroundColor: theme.colors.background,
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
    textStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(theme.spacing.xs),
    },
    buttonText: {
      color: theme.colors.primaryButtonText,
      ...typography.buttonLG,
    },

    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContaier: {
      marginTop: verticalScale(theme.spacing.lg),
      marginBottom: verticalScale(theme.spacing.md),
    },
    imageStyles: {
      width: '80%', // take 80% of parent width
      height: undefined, // let aspect ratio decide height
      aspectRatio: 250 / 160, // keep your logo’s ratio
      alignSelf: 'center',
    },

    textStyles: {
      color: theme.colors.headerText,
      ...typography.titleLG,
    },
    linkText: {
      alignItems: 'center',
      marginTop: verticalScale(theme.spacing.md),
    },
    button: {
      borderRadius: scale(theme.borderRadius.xl),
      paddingVertical: verticalScale(12),
    },
  });
