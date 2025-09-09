import { colors } from './colors';
import { borderRadius } from './borderRadius';
import { fonts } from './fonts';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { Theme } from './theme.interface';

export const lightTheme: Theme = {
  colors: {
    background: colors.backgroundLight,
    cardBackground: colors.cardLight,
    headerBackground: colors.headerLight,
    headerText: colors.headerTextLight,
    bottomNavActive: colors.bottomNavActiveLight,
    bottomNavInactive: colors.bottomNavInactiveLight,
    primaryButtonBackground: colors.primaryButtonLight,
    primaryButtonText: colors.primaryButtonTextLight,
    secondaryButtonBackground: colors.secondaryButtonLight,
    secondaryButtonText: colors.secondaryButtonTextLight,
    headerTextColor: colors.headerTextLight,
    subtitleTextColor: colors.subtitleTextLight,
    placeholderTextColor: colors.placeholderTextLight,
    inputTextColor: colors.inputTextLight,
    primaryIcon: colors.primaryIconLight,
    secondaryIcon: colors.secondaryIconLight,
    linkText: colors.linkTextLight,
    modals: {
      errorBackground: colors.errorBackgroundLight,
      errorText: colors.errorTextLight,
      successBackground: colors.successBackgroundLight,
      successText: colors.successTextLight,
      confirmationBackground: colors.confirmationBackgroundLight,
      confirmationText: colors.confirmationTextLight,
      errorHeader: colors.errorHeaderLight,
      successHeader: colors.successHeaderLight,
      confirmationHeader: colors.confirmationHeaderLight,
    },
    chips: {
      allBackground: colors.allBackgroundLight,
      allText: colors.allTextLight,
      pendingBackground: colors.pendingBackgroundLight,
      pendingText: colors.pendingTextLight,
      completedBackground: colors.completedBackgroundLight,
      completedText: colors.completedTextLight,
      urgentBackground: colors.urgentBackgroundLight,
      urgentText: colors.urgentTextLight,
      normalBackground: colors.normalBackgroundLight,
      normalText: colors.normalTextLight,
      lowKeyBackground: colors.lowKeyBackgroundLight,
      lowKeyText: colors.lowKeyTextLight,
      defaultChipBakground: colors.defaultChipBackgroundLight,
      defaultChipText: colors.defaultChipTextLight,
    },
    inputBackground: colors.inputBackgroundLight,
    border: colors.borderLight,
  },
  fontSizes: fonts.sizes,
  spacing,
  borderRadius,
  shadow: shadows,
  buttonSizes: { small: 32, medium: 48, large: 56 },
};
