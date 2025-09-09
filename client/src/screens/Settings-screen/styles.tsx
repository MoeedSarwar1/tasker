import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';

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
      borderRadius: 16,
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
