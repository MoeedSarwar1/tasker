import { StyleSheet } from 'react-native';

const settingStyles = (Platform, insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9fafb',
      paddingTop: 24,
    },

    logoutWrapper: {
      flex: 1,
      marginHorizontal: 24,
      justifyContent: 'flex-end',
      paddingBottom:
        Platform.OS === 'ios' ? insets.bottom + 38 : insets.bottom + 16,
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
