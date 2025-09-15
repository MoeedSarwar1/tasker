import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

const loginStyles = (theme: Theme) =>
  StyleSheet.create({
    containaer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.lg,
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
      ...typography.buttonMedium,
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
    inputContaier: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    linkText: {
      alignItems: 'center',
      marginTop: theme.spacing.lg,
    },

    buttonText: {
      color: theme.colors.primaryButtonText,
      ...typography.buttonLarge,
    },
  });

export default loginStyles;
