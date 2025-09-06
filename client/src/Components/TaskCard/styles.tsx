import { StyleSheet } from 'react-native';

const cardStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 17,
      borderColor: '#E5E7EB',
      marginHorizontal: 24,
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
      gap: 8,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    footer: {
      paddingTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 17,
    },
    details: {
      fontSize: 14,
      color: '#6B7280',
    },
    user: {
      fontSize: 12,
      color: '#6B7280',
    },
    deleteText: {
      color: '#EF4444',
    },
    childrenWrapperStyle: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 12,
      borderColor: '#E5E7EB',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    childView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 80,
    },
  });
export default cardStyles;
