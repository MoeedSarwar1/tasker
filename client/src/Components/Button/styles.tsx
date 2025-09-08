import { StyleSheet } from 'react-native';

const buttonStyles = () =>
  StyleSheet.create({
    container: {
      borderRadius: 16,
      backgroundColor: '#4B4B4B',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    buttonText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontFamily: 'Poppins-SemiBold', // <-- change font here
    },
  });
export default buttonStyles;
