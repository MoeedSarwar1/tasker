import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
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
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
      gap: verticalScale(theme.spacing.sm),
      padding: scale(theme.spacing.lg),
      marginHorizontal: scale(theme.spacing.lg),
    },

    // ✅ Success
    successModalContainer: {
      backgroundColor: theme.colors.modals.successBackground,
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
      gap: verticalScale(theme.spacing.sm),
      marginHorizontal: scale(theme.spacing.lg),
      padding: scale(theme.spacing.lg),
    },
    successModalHeader: {
      textAlign: 'center',
      ...typography.titleLG,
      color: theme.colors.modals.successHeader,
    },
    successModalText: {
      textAlign: 'center',
      color: theme.colors.modals.successText,
      ...typography.captionXS,
    },

    // ⚠️ Confirmation
    confirmModalContainer: {
      marginHorizontal: scale(theme.spacing.lg),
      backgroundColor: theme.colors.modals.confirmationBackground,
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
      gap: verticalScale(theme.spacing.sm),
      padding: scale(theme.spacing.lg),
    },
    confirmModalHeader: {
      textAlign: 'center',
      ...typography.titleLG,
      color: theme.colors.modals.confirmationHeader,
    },
    confirmModalText: {
      textAlign: 'center',
      color: theme.colors.modals.confirmationText,
      ...typography.captionXS,
    },

    // ❌ Error
    errorModalContainer: {
      backgroundColor: theme.colors.modals.errorBackground,
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
      gap: verticalScale(theme.spacing.sm),
      padding: scale(theme.spacing.lg),
      marginHorizontal: scale(theme.spacing.lg),
    },
    errorModalHeader: {
      textAlign: 'center',
      color: theme.colors.modals.errorHeader,
      ...typography.titleLG,
    },
    errorModalText: {
      textAlign: 'center',
      color: theme.colors.modals.errorText,
      ...typography.captionXS,
    },

    childrenContainer: { marginTop: 8 },
    buttonContainer: { flex: 1 },
    // Default / fallback
    modalHeader: {
      color: theme.colors.modals.defaultHeader,
      ...typography.titleLG,
    },
    modalText: {
      ...typography.captionXS,
      color: theme.colors.modals.defaultText,
    },

    buttonRow: { flexDirection: 'row', gap: 8, marginTop: 8 },

    button: {
      borderRadius: scale(theme.borderRadius.xl),
      paddingVertical: verticalScale(theme.spacing.sm),
      backgroundColor: theme.colors.secondaryButtonBackground,
    },
    addButton: {
      paddingVertical: verticalScale(theme.spacing.sm),
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
