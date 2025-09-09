import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';

const headerStyles = (insets, theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 16,
      paddingTop: insets.top,
      backgroundColor: theme.colors.headerBackground,
      ...shadows.heavy,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: theme.colors.headerText,
      ...typography.header,
    },
    subtitle: {
      color: theme.colors.subtitleTextColor,
      ...typography.small,
    },
  });

export default headerStyles;
