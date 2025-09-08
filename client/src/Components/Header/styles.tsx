import { StyleSheet } from 'react-native';

const headerStyles = insets =>
  StyleSheet.create({
    container: {
      padding: 16,
      paddingTop: insets.top,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      justifyContent: 'space-between',
      borderBottomColor: '#eee',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 32,
      fontFamily: 'Poppins-Bold', // <-- change font here
      color: '#333',
    },
    subtitle: {
      fontSize: 16,
      color: '#4b5563',
    },
  });

export default headerStyles;
