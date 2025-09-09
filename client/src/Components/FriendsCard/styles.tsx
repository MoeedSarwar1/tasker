import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { shadows } from '../../theme/shadows';
import { typography } from '../../theme/typography';

const cardStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 16,
      borderColor: theme.colors.border,
      padding: 17,
      marginHorizontal: 24,
      ...shadows.medium,
    },
    title: {
      color: theme.colors.headerText,
      marginBottom: 1,
      ...typography.body,
    },
    description: {
      color: theme.colors.subtitleTextColor,
      marginBottom: 1,
      ...typography.micro,
    },
    footer: {
      paddingTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    avatar: {
      width: 35,
      height: 35,
      borderRadius: 35 / 2, // circle
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0', // optional fallback bg
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    addButton: {
      paddingVertical: 8,
      backgroundColor: theme.colors.primaryButtonBackground,
    },
    addButtonText: {
      color: theme.colors.primaryButtonText,
      ...typography.buttonMedium,
    },
  });
export default cardStyles;
