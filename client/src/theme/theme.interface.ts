export interface ModalsColors {
  errorBackground: string;
  errorText: string;
  errorHeader: string;

  successBackground: string;
  successText: string;
  successHeader: string;

  confirmationBackground: string;
  confirmationText: string;
  confirmationHeader: string;
}

export interface ChipsColors {
  // Task filter chips
  allBackground: string;
  allText: string;
  pendingBackground: string;
  pendingText: string;
  completedBackground: string;
  completedText: string;

  defaultChipBakground: string;
  defaultChipText: string;
  // Priority chips
  urgentBackground: string;
  urgentText: string;
  normalBackground: string;
  normalText: string;
  lowKeyBackground: string;
  lowKeyText: string;
}

export interface ThemeColors {
  primaryButtonSolid: string;
  descriptionText: string;
  background: string;
  cardBackground: string;
  inputBackground: string;
  headerBackground: string;
  headerText: string;
  bottomNavActive: string;
  bottomNavInactive: string;
  primaryButtonBackground: string;
  primaryButtonText: string;
  secondaryButtonBackground: string;
  secondaryButtonText: string;
  headerTextColor: string;
  subtitleTextColor: string;
  placeholderTextColor: string;
  inputTextColor: string;
  primaryIcon: string;
  border: string; // ✅ added border option
  secondaryIcon: string;
  disabledPrimaryIcon: string;
  disabledSecondaryIcon: string;
  modals: ModalsColors;
  linkText: string; // ✅ Added for link text
  chips: ChipsColors;
}

export interface Theme {
  colors: ThemeColors;
  fontSizes: Record<string, number>;
  spacing: Record<string, number>;
  borderRadius: Record<string, number>;
  shadow: Record<string, any>;
  buttonSizes: Record<string, number>;
}
