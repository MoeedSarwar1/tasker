import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

export const bottomSheetStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
    },
    chipRow:{ flexDirection: 'row', flexWrap: 'wrap' },
    buttonContainer:{ flex: 1 },
    label: {
      marginBottom: 8,
      marginTop: 8,
      color: theme.colors.headerText,
      ...typography.body,
    },
    date:{
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
      paddingHorizontal: 8,
      paddingVertical: 12,
      backgroundColor: theme.colors.secondaryButtonBackground,
    },
    addButton: {
      paddingHorizontal: 8,
      paddingVertical: 12,
      backgroundColor: theme.colors.primaryButtonBackground,
    },
    addButtonText: {
      color: theme.colors.primaryButtonText,
      ...typography.buttonLarge,
    },
    buttonText: {
      color: theme.colors.secondaryButtonText,
      ...typography.buttonLarge,
    },
  });
