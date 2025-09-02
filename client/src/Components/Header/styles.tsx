import { StyleSheet } from 'react-native';

const headerStyles = () =>
  StyleSheet.create({
    container: {
      padding: 16,
      paddingTop: 70,
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      borderBottomWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      justifyContent: 'space-between',
      borderBottomColor: '#eee',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
    },
    subtitle: {
      fontSize: 16,
      color: '#4b5563',
    },
  });

export default headerStyles;
