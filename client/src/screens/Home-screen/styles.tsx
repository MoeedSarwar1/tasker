import { StyleSheet } from 'react-native';

const homeStles = () =>
  StyleSheet.create({
    childrenWrapperStyle: {
      backgroundColor: '#4B4B4B',
      borderRadius: 16,
      padding: 16,
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
      backgroundColor: '#C0C0C0',
      borderRadius: 16,
      padding: 16,
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
    modalText: {
      fontSize: 12,
      color: '#999',
    },
    successModalHeader: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#218838',
    },
    successModalText: {
      fontSize: 12,
      color: '#6FCF97',
    },
    modalHeader: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },

    modalContainer: {
      alignItems: 'center',
      gap: 8,
    },
  });

export default homeStles;
