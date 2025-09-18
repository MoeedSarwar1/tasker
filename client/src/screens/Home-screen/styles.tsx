import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

const homeStles = (insets, theme: Theme) =>
  StyleSheet.create({
    childrenWrapperStyle: {
      borderRadius: theme.borderRadius.xl,
      padding: scale(theme.spacing.md),
      backgroundColor: theme.colors.primaryButtonSolid,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    parentView: {
      paddingBottom: insets.bottom,
      marginTop: verticalScale(theme.spacing.sm),
      gap: scale(theme.spacing.md),
    },
    editColor: {
      backgroundColor: theme.colors.secondaryButtonBackground,
      borderRadius: theme.borderRadius.xl,
      padding: scale(theme.spacing.md),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    modalText: {
      color: theme.colors.secondaryButtonText,
      ...typography.titleXL,
    },
    text: {
      color: theme.colors.primaryButtonText,
      ...typography.titleXL,
    },

    flatlistContainer: {
      paddingBottom: insets.bottom + 80,
    },
    list: {
      paddingTop: verticalScale(theme.spacing.lg),
    },
    emptyTextStyle: {
      color: theme.colors.subtitleTextColor,
      ...typography.bodyMD,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: scale(theme.spacing.sm),
    },
    container: { flex: 1, backgroundColor: theme.colors.background },
  });

export default homeStles;
