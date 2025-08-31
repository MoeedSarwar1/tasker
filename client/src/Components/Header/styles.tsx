import { StyleSheet } from 'react-native';

const headerStyles = (bottomSheetHeader: boolean) =>
  StyleSheet.create({
    container: {
      padding: 16,
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      borderBottomWidth: bottomSheetHeader ? 0 : 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      justifyContent: 'space-between',
      borderBottomColor: '#eee',
      ...(bottomSheetHeader && {
        paddingVertical: 0,
      }),
    },
    title: {
      fontSize: bottomSheetHeader ? 20 : 32,
      fontWeight: 'bold',
      color: '#333',
    },
    subtitle: {
      fontSize: 16,
      color: '#4b5563',
    },
  });

export default headerStyles;
