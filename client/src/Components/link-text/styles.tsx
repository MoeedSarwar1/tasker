import { StyleSheet } from 'react-native';

const linkStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
    },
    textStyle: {
      fontSize: 16,
      color: '#4B5563',
    },
    linkText: {
      fontSize: 16,
      fontWeight: 'semibold',
      color: '#9333EA',
    },
  });

export default linkStyles;
