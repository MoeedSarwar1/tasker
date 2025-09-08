import { StyleSheet } from 'react-native';

const searchBarStyles = () =>
  StyleSheet.create({
    input: {
      flexDirection: 'row-reverse',
      gap: '8',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      color: '#333',
      padding: 16,
      marginBottom: 16,
    },
  });
export default searchBarStyles;
