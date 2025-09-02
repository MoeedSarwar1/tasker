import { StyleSheet } from 'react-native';

const cardStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 17,
      marginVertical: 16,
      borderColor: '#E5E7EB',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: 'semibold',
      color: '#111827',
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: '#4B5563',
      marginBottom: 12,
    },
    date: {
      alignItems: 'flex-end',
    },
    header: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    user: {
      fontSize: 12,
      color: '#6B7280',
    },
  });
export default cardStyles;
