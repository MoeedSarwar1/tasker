import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const loginStyles = (theme: Theme) =>
  StyleSheet.create({
    containaer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: scale(theme.spacing.lg),
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
    textStyles: {
      color: theme.colors.headerText,
      ...typography.titleLG,
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
    inputContaier: {
      marginTop: verticalScale(theme.spacing.lg),
      marginBottom: verticalScale(theme.spacing.md),
    },
    linkText: {
      alignItems: 'center',
      marginTop: verticalScale(theme.spacing.md),
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

export default loginStyles;
