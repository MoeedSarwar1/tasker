import { StyleSheet } from 'react-native';

const headerStyles = (bottomSheetHeader: boolean) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: bottomSheetHeader ? 0 : 1,
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
  });

export default headerStyles;
