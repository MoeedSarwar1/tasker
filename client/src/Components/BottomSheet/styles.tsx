import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';

export const bottomSheetStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    bottomshhetContainer: {
      borderRadius: 16,
    },
    parentView: {
      marginHorizontal: 24,
    },
    title: {
      color: theme.colors.headerText,
      ...typography.headingXL,
    },
    separator: {
      height: 1,
      marginHorizontal: -24,
      marginVertical: 8, // spacing above & below
      alignSelf: 'stretch',
      ...shadows.heavy,
    },
    scrollContent: {
      paddingBottom: 20, // <- add padding to scroll above keyboard
      marginHorizontal: 24,
    },
  });
