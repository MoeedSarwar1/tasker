import { StyleSheet } from 'react-native';

const cardStyles = (loadingCard: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
    date: {
      fontSize: 12,
      color: '#999',
      textAlign: 'right',
    },
    completedText: {
      fontWeight: 'bold',
      color: 'green',
    },
    incompletedText: {
      fontWeight: 'bold',
      color: 'red',
    },
    header: {
      flexDirection: !loadingCard ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
  });
export default cardStyles;
