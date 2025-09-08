import { StyleSheet } from 'react-native';

const friendsStyles = insets =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9fafb',
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    top: { marginTop: 8 },
    flatlistContainer: {
      gap: 16,
      paddingBottom: insets.bottom + 80,
    },

    list: {
      paddingTop: 24,
    },
        subtitle: {
      fontSize: 16,
      color: '#4b5563',
    },

  });

export default friendsStyles;
