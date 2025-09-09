import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

const linkStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: theme.spacing.xs,
      alignItems: 'center',
    },
    textStyle: {
      color: '#4B5563',
      ...typography.small,
    },
    linkText: {
      fontWeight: 'semibold',
      color: theme.colors.linkText,
      ...typography.small,
    },
  });

export default linkStyles;
