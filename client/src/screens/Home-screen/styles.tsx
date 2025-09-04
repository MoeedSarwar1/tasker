import { StyleSheet } from 'react-native';

const homeStles = () =>
  StyleSheet.create({
    childrenWrapperStyle: {
      backgroundColor: 'red',
      borderRadius: 16,
      padding: 16,
      borderColor: '#E5E7EB',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 2,
    },

    editColor: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      borderColor: '#E5E7EB',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 2,
    },

    parentView: {
      marginHorizontal: 24,
      gap: 16,
    },
  });

export default homeStles;
