import { Theme } from '../../theme/theme.interface';
import { StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';

export const registerationStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      justifyContent: 'center',
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    input: {
      flexDirection: 'row',
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
    button: {
      backgroundColor: theme.colors.primaryButtonBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
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
      marginBottom: 32,
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
  });
