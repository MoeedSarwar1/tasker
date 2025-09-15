import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { shadows } from '../../theme/shadows';
import { typography } from '../../theme/typography';

const homeStles = (insets, theme: Theme) =>
  StyleSheet.create({
    childrenWrapperStyle: {
      borderRadius: 16,
      padding: 16,
      backgroundColor: theme.colors.primaryButtonSolid,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...shadows.medium,
    },

    parentView: {
      paddingBottom: insets.bottom,
      marginTop: 8,
      gap: 16,
    },
    editColor: {
      backgroundColor: theme.colors.secondaryButtonBackground,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...shadows.medium,
    },

    modalText: {
      color: theme.colors.secondaryButtonText,
      ...typography.buttonMedium,
    },
    text: {
      color: theme.colors.secondaryButtonText,
      ...typography.buttonMedium,
    },

    flatlistContainer: {
      gap: 16,
      paddingBottom: insets.bottom + 80,
    },
    list: {
      paddingTop: 24,
    },
    emptyTextStyle: {
      color: theme.colors.subtitleTextColor,
      ...typography.title,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
    },
    container: { flex: 1, backgroundColor: theme.colors.background },
  });

export default homeStles;
