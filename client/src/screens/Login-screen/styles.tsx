import { StyleSheet } from 'react-native';

const loginStyles = () =>
  StyleSheet.create({
    containaer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#faf9fb',
      paddingHorizontal: 20,
    },
    logoContainer: {
      marginTop: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyles: {
      height: 108,
      width: 300,
    },
    textStyles: {
      color: '#4B5563',
    },
    input: {
      flexDirection: 'row',
      gap: '8',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      color: '#333',
      padding: 16,
      marginBottom: 16,
    },
    inputContaier: {
      marginTop: 24,
      marginBottom: 32,
    },
  });

export default loginStyles;
