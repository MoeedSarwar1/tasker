import { StyleSheet } from 'react-native';

const homeStles = insets =>
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
    formView: {
      paddingBottom: insets.bottom,
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
    text: { color: '#F9fafb', fontWeight: 'bold', fontSize: 16 },

    bottomshhetContainer: {
      backgroundColor: '#F9fafb',
      borderRadius: 16,
    },
    flatlistContainer: {
      gap: 16,
      paddingBottom: insets.bottom + 80,
    },
    list: {
      paddingTop: 24,
    },
    emptyTextStyle:{
 color: '#7f7f7f', fontSize: 16 
    },
    emptyContainer:{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
            },
    container:{ flex: 1, backgroundColor: '#F9fafb' },
    modalContainer: {
      alignItems: 'center',
      gap: 8,
    },
  });

export default homeStles;
