import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';

const settingStyles = (Platform, insets, theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: 24,
      gap: 8,
    },

    logoutWrapper: {
      flex: 1,
      marginHorizontal: 24,
      justifyContent: 'flex-end',
      paddingBottom:
        Platform.OS === 'ios' ? insets.bottom + 38 : insets.bottom + 16,
    },
    childrenWrapperStyle: {
      backgroundColor: theme.colors.secondaryButtonBackground,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 2,
      position: 'absolute',
      bottom: 12,
      left: 24,
      right: 24,
    },
    themeButton: {
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      marginHorizontal: '24',
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    text: {
      color: theme.colors.headerText,
      fontFamily: 'Poppins-Bold', // <-- change font here
      fontSize: 16,
    },
  });

export default settingStyles;
