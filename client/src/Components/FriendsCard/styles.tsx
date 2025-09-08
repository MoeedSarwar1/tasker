import { StyleSheet } from 'react-native';

const cardStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 17,
      borderColor: '#E5E7EB',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    title: {
      fontSize: 14,
      fontFamily: 'Poppins-SemiBold', // <-- change font here
      color: '#111827',
      marginBottom: 4,
    },
    description: {
      fontSize: 12,
      color: '#4B5563',
    },
    footer: {
      paddingTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 17,
    },
  });
export default cardStyles;
