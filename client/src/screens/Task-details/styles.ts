import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

export const taskDetailsStyles = (theme:Theme) => StyleSheet.create({    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingBottom: 32,
    paddingHorizontal:24,
    paddingTop:24
    },
    sectionTitle: {
      ...typography.header,
      color: theme.colors.headerText,
      fontWeight: '600',
      marginBottom: 16,
    },
});
