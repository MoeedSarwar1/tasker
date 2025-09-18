import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

const cardStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 0.5,
      borderRadius: 16,
      borderColor: theme.colors.border,
      marginHorizontal: 24,
      overflow: 'hidden', // Important for gradient to respect border radius
    },
    gradientContainer: {
      padding: 17,
      flex: 1,
    },

    title: {
      color: theme.colors.headerText,
      marginBottom: 1,
      ...typography.body,
    },
    description: {
      color: theme.colors.subtitleTextColor,
      marginBottom: 1,
      ...typography.micro,
    },
    footer: {
      paddingTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    avatar: {
      width: 35,
      height: 35,
      borderRadius: 35 / 2, // circle
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    button: {
      borderRadius: 16,
      paddingVertical: 8,
      backgroundColor: theme.colors.secondaryButtonBackground,
    },
    addButton: {
      paddingVertical: 8,
      backgroundColor: theme.colors.primaryButtonBackground,
    },
    addButtonText: {
      color: theme.colors.primaryButtonText,
      ...typography.buttonMicro,
    },
    flex: {
      flex: 1,
    },
    buttonText: {
      color: theme.colors.secondaryButtonText,
      ...typography.buttonMicro,
    },
  });
export default cardStyles;
