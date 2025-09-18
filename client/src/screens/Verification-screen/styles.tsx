import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const verificationScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: scale(theme.spacing.lg),
      justifyContent: 'center',
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    input: {
      textAlign: 'center',
      alignItems: 'center',
      letterSpacing: 8,
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.xl,
      color: theme.colors.inputTextColor,
      padding: moderateScale(theme.spacing.md),
      marginBottom: verticalScale(theme.spacing.md),
    },
    buttonText: {
      color: theme.colors.primaryButtonText,
      ...typography.buttonLG,
    },
    linkText: {
      alignItems: 'center',
      marginTop: verticalScale(theme.spacing.lg),
    },

    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContaier: {
      marginTop: 24,
      marginBottom: 24,
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
    headerStyles: {
      marginTop: theme.spacing.xl,
      color: theme.colors.headerText,
      textAlign: 'center',
      ...typography.captionSM,
    },
  });
