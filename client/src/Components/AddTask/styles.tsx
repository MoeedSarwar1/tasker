import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { shadows } from '../../theme/shadows';

export const bottomSheetStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: scale(theme.borderRadius.xl),
    },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
    buttonContainer: { flex: 1 },
    label: {
      marginVertical: verticalScale(theme.spacing.sm),
      color: theme.colors.headerText,
      ...typography.titleMD,
    },
    date: {
      justifyContent: 'center',
      marginBottom: verticalScale(theme.spacing.md),
      alignItems: 'center',
    },
    title: {
      color: theme.colors.headerText,
      ...typography.headingXL,
    },
    separator: {
      height: 1,
      marginHorizontal: -24,
      marginVertical: 8, // spacing above & below
      alignSelf: 'stretch',
      ...shadows.heavy,
    },
    input: {
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: scale(theme.borderRadius.xl),
      color: theme.colors.inputTextColor,
      padding: moderateScale(theme.spacing.md),
      marginBottom: verticalScale(theme.spacing.md),
    },
    descriptionInput: {
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.xl,
      color: theme.colors.inputTextColor,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      height: verticalScale(100),
    },
    buttonRow: {
      flexDirection: 'row',
      gap: scale(theme.spacing.sm),
      marginTop: verticalScale(theme.spacing.sm),
    },
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
