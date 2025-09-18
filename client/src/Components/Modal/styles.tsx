import { StyleSheet } from 'react-native';
import { shadows } from '../../theme/shadows';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

export const modalStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: theme.colors.modals.defaultBackground, // default
      borderRadius: 16,
      alignItems: 'center',
      gap: 8,
      padding: 20,
      marginHorizontal: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },

    // ✅ Success
    successModalContainer: {
      backgroundColor: theme.colors.modals.successBackground,
      borderRadius: 16,
      alignItems: 'center',
      gap: 8,
      padding: 20,
      marginHorizontal: 24,
      elevation: 2,
      ...shadows.heavy,
    },
    successModalHeader: {
      textAlign: 'center',
      ...typography.title,
      color: theme.colors.modals.successHeader,
    },
    successModalText: {
      textAlign: 'center',
      color: theme.colors.modals.successText,
      ...typography.micro,
    },

    // ⚠️ Confirmation
    confirmModalContainer: {
      backgroundColor: theme.colors.modals.confirmationBackground,
      borderRadius: 16,
      alignItems: 'center',
      gap: 8,
      padding: 20,
      marginHorizontal: 24,
      elevation: 2,
      ...shadows.heavy,
    },
    confirmModalHeader: {
      textAlign: 'center',
      ...typography.title,
      color: theme.colors.modals.confirmationHeader,
    },
    confirmModalText: {
      textAlign: 'center',
      color: theme.colors.modals.confirmationText,
      ...typography.micro,
    },

    // ❌ Error
    errorModalContainer: {
      backgroundColor: theme.colors.modals.errorBackground,
      borderRadius: 16,
      alignItems: 'center',
      gap: 8,
      padding: 20,
      marginHorizontal: 24,
      ...shadows.heavy,
    },
    errorModalHeader: {
      textAlign: 'center',
      elevation: 2,
      color: theme.colors.modals.errorHeader,
      ...typography.title,
    },
    errorModalText: {
      textAlign: 'center',
      color: theme.colors.modals.errorText,
      ...typography.micro,
    },

    childrenContainer: { marginTop: 8 },
    buttonContainer: { flex: 1 },
    // Default / fallback
    modalHeader: {
      color: theme.colors.modals.defaultHeader,
      ...typography.title,
    },
    modalText: { ...typography.micro, color: theme.colors.modals.defaultText },

    buttonRow: { flexDirection: 'row', gap: 8, marginTop: 8 },

    button: {
      borderRadius: 16,
      paddingHorizontal: 8,
      paddingVertical: 10,
      backgroundColor: theme.colors.secondaryButtonBackground,
    },
    addButton: {
      paddingVertical: 10,
      backgroundColor: theme.colors.primaryButtonBackground,
    },
    addButtonText: {
      color: theme.colors.primaryButtonText,
      ...typography.buttonSmall,
    },
    buttonText: {
      color: theme.colors.secondaryButtonText,
      ...typography.buttonSmall,
    },
  });
