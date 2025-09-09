import { StyleSheet } from 'react-native';
import { fonts } from './fonts';

export const typography = StyleSheet.create({
  header: {
    fontFamily: fonts.families.bold,
    fontSize: fonts.sizes.heading,
  },
  title: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.xl,
  },
  body: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.md,
  },
  small: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.sm,
  },
  micro: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.xs, // extra small
  },

  // 🔘 Button Text Variants
  buttonLarge: {
    fontFamily: fonts.families.bold,
    fontSize: fonts.sizes.lg,
  },
  buttonMedium: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.md,
  },
  buttonSmall: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.sm,
  },
  buttonMicro: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.xs, // extra small
  },
});
