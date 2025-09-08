import { StyleSheet } from 'react-native';

const settingStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9fafb',
      paddingHorizontal: 24,
      paddingTop: 24,
    },

    logoutWrapper: {
      justifyContent: 'flex-end',
    },
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
    text: {
      color: '#F9fafb',
      fontFamily: 'Poppins-Bold', // <-- change font here
      fontSize: 16,
    },
  });

export default settingStyles;
