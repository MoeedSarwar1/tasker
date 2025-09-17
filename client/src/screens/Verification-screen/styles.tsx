import { Theme } from '../../theme/theme.interface';
import { StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';
import headerStyles from '../../Components/Header/styles';

export const verificationScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      justifyContent: 'center',
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    input: {
      textAlign: 'center',
      gap: theme.spacing.sm,
      alignItems: 'center',
      letterSpacing: 8,
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.xl,
      color: theme.colors.inputTextColor,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    buttonText: {
      color: theme.colors.primaryButtonText,
      ...typography.buttonLarge,
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
      ...typography.buttonMedium,
    },
    headerStyles: {
      marginTop: theme.spacing.xl,
      color: theme.colors.headerText,
      textAlign: 'center',
      ...typography.micro,
    },
  });
