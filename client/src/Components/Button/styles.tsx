import { StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';

const buttonStyles = () =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    radius: {
      borderRadius: 16,
    },
    buttonText: {
      ...typography.buttonLarge,
    },
  });
export default buttonStyles;
