import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { scale, verticalScale } from 'react-native-size-matters';
import { typography } from '../../theme/typography';

export const chipStyles = (theme: Theme) =>
  StyleSheet.create({
    chip: {
      paddingVertical: verticalScale(theme.spacing.xs),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(theme.spacing.sm),
      borderRadius: scale(theme.borderRadius.xl),
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.chips.defaultChipBakground,
      marginRight: scale(theme.spacing.xs),
      marginBottom: verticalScale(theme.spacing.sm),
    },
    text: {
      color: theme.colors.chips.defaultChipText,
      ...typography.captionXS,
    },
  });
