import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';

export const chipStyles = (theme: Theme) =>
  StyleSheet.create({
    chip: {
      paddingVertical: 6,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderRadius: 16,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.chips.defaultChipBakground,
      marginRight: 8,
      marginBottom: 8,
    },
    text: {
      fontSize: 14,
      color: theme.colors.chips.defaultChipText,
    },
  });
