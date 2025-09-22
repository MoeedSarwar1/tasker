import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

export const supportStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: 20,
    },
    title: {
      ...typography.headingMD,
      marginBottom: 20,
    },
    faqItem: {
      marginBottom: 20,
    },
    question: {
      ...typography.titleXL,
    },
    answer: {
      ...typography.captionXS,
      marginTop: 5,
    },
  });
