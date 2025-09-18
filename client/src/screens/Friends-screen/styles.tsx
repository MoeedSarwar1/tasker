import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';
import { scale, verticalScale } from 'react-native-size-matters';

const friendsStyles = (theme: Theme, insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: verticalScale(theme.spacing.lg),
    },
    top: {
      marginTop: verticalScale(theme.spacing.sm),
      marginHorizontal: -verticalScale(theme.spacing.lg),
    },
    flatlistContainer: {
      gap: scale(theme.spacing.md),
      paddingBottom: insets.bottom + 170,
    },

    list: {
      paddingTop: verticalScale(theme.spacing.lg),
    },
    subtitle: {
      color: theme.colors.subtitleTextColor,
      ...typography.captionXS,
      marginHorizontal: scale(theme.spacing.lg),
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: scale(theme.spacing.sm),
    },
    emptyTextStyle: {
      color: theme.colors.subtitleTextColor,
      ...typography.bodyMD,
    },
    logoutContainer: {
      position: 'absolute',
      bottom: scale(40),
      right: scale(30),
      borderRadius: 200,
    },
    content: {
      padding: scale(theme.spacing.sm),
    },
  });

export default friendsStyles;
