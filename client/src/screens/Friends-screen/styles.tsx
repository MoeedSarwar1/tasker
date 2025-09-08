import { StyleSheet } from 'react-native';

const friendsStyles = insets =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9fafb',
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
      fontSize: 16,
      color: '#4b5563',
      marginHorizontal: 24,
    },
  });

export default friendsStyles;
