import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme.interface';
import { typography } from '../../theme/typography';

const friendsStyles = (theme: Theme, insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: 24,
    },
    top: { marginTop: 8, marginHorizontal: -24 },
    flatlistContainer: {
      gap: 16,
      paddingBottom: insets.bottom + 170,
    },

    list: {
      paddingTop: 24,
    },
    subtitle: {
      color: theme.colors.subtitleTextColor,
      ...typography.small,
      marginHorizontal: 24,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
    },
    emptyTextStyle: {
      color: theme.colors.subtitleTextColor,
      ...typography.title,
    },
  });

export default friendsStyles;
