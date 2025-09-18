import { StyleSheet } from 'react-native';
import { fonts } from './fonts';

export const typography = StyleSheet.create({
  // 📌 Headings
  headingXL: {
    fontFamily: fonts.families.bold,
    fontSize: fonts.sizes.heading,
  },
  headingLG: {
    fontFamily: fonts.families.bold,
    fontSize: fonts.sizes.xl,
  },
  headingMD: {
    fontFamily: fonts.families.bold,
    fontSize: fonts.sizes.lg,
  },
  headingSM: {
    fontFamily: fonts.families.bold,
    fontSize: fonts.sizes.md,
  },
  headingXS: {
    fontFamily: fonts.families.bold,
    fontSize: fonts.sizes.sm,
  },

  // 📌 Titles
  titleXL: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.xl,
  },
  titleLG: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.lg,
  },
  titleMD: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.md,
  },
  titleSM: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.sm,
  },
  titleXS: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.xs,
  },

  // 📌 Body text
  bodyXL: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.xl,
  },
  bodyLG: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.lg,
  },
  bodyMD: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.md,
  },
  bodySM: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.sm,
  },
  bodyXS: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.xs,
  },

  // 📌 Captions / Small text
  captionMD: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.md,
  },
  captionSM: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.sm,
  },
  captionXS: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.xs,
  },

  // 📌 Buttons
  buttonXL: {
    fontFamily: fonts.families.bold,
    fontSize: fonts.sizes.xl,
  },
  buttonLG: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.lg,
  },
  buttonMD: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.md,
  },
  buttonSM: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.sm,
  },
  buttonXS: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.xs,
  },

  // 📌 Labels (optional, for chips, tags, etc.)
  labelLG: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.lg,
  },
  labelMD: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.md,
  },
  labelSM: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.sm,
  },
  labelXS: {
    fontFamily: fonts.families.medium,
    fontSize: fonts.sizes.xs,
  },
});
