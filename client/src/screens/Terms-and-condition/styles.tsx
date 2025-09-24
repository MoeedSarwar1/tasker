import { StyleSheet } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';

export const termsConditionsStyles = (theme: any) =>
  StyleSheet.create({
    contentContainer: {
      paddingTop: verticalScale(8),
      paddingHorizontal: 0, // Remove since CustomBottomSheet handles this
    },
    headerSection: {
      marginBottom: verticalScale(24),
    },
    lastUpdated: {
      fontSize: scale(12),
      fontWeight: '500',
      marginBottom: verticalScale(12),
      opacity: 0.8,
    },
    introText: {
      fontSize: scale(14),
      lineHeight: scale(22),
      fontWeight: '400',
    },
    itemContainer: {
      marginBottom: verticalScale(20),
    },
    itemTitle: {
      fontSize: scale(16),
      fontWeight: '600',
      marginBottom: verticalScale(8),
      lineHeight: scale(24),
    },
    itemDescription: {
      fontSize: scale(14),
      lineHeight: scale(22),
      fontWeight: '400',
    },
    footerSection: {
      marginTop: verticalScale(32),
      paddingTop: verticalScale(20),
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
    },
    footerText: {
      fontSize: scale(13),
      lineHeight: scale(20),
      fontWeight: '400',
      fontStyle: 'italic',
      textAlign: 'center',
    },
  });
