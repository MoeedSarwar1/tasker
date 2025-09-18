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
      color: theme.colors.descriptionText,
      ...typography.captionSM,
    },
    linkText: {
      fontWeight: 'semibold',
      color: theme.colors.linkText,
      ...typography.captionSM,
    },
  });

export default linkStyles;
