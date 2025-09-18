import { StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';
import { scale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../theme/theme.interface';

const buttonStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(theme.spacing.lg),
      paddingVertical: verticalScale(theme.spacing.md),
    },
    radius: {
      borderRadius: scale(theme.borderRadius.xl),
    },
    buttonText: {
      ...typography.buttonLG,
    },
  });
export default buttonStyles;
