import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

export const bottomSheetStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
    },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
    buttonContainer: { flex: 1 },
    label: {
      marginBottom: 8,
      marginTop: 8,
      color: theme.colors.headerText,
      ...typography.titleMD,
    },
    date: {
      justifyContent: 'center',
      marginBottom: 12,
      alignItems: 'center',
    },
    input: {
      gap: theme.spacing.sm,
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.xl,
      color: theme.colors.inputTextColor,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    descriptionInput: {
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.xl,
      color: theme.colors.inputTextColor,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      height: 100,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 24,
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
      ...typography.buttonSM,
    },
    buttonText: {
      color: theme.colors.secondaryButtonText,
      ...typography.buttonSM,
    },
  });
