import { Insets, StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

const headerStyles = (insets: Insets, theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing.md,
      paddingTop: insets.top,
      backgroundColor: theme.colors.headerBackground,
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
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: theme.spacing.md,
    },
    backRow: {
      flexDirection: 'row',
      gap: 8,
      alignItems:'center'
    },
  });

export default headerStyles;
