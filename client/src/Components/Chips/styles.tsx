// Chip Styles
import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { scale, verticalScale } from 'react-native-size-matters';
import { typography } from '../../theme/typography';

export const chipStyles = (theme: Theme) =>
  StyleSheet.create({
    chip: {
      paddingVertical: verticalScale(theme.spacing.xs),
      paddingHorizontal: scale(16),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(20),
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.chips?.defaultChipBakground,
      marginRight: scale(8),
      marginBottom: verticalScale(8),
    },
    text: {
      color: theme.colors.chips?.defaultChipText,
      fontWeight: '500',
      lineHeight: scale(18),
      letterSpacing: 0.25,
      textAlign: 'center',
      ...typography.captionXS,
    },
  });
