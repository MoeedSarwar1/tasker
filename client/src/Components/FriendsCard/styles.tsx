import { StyleSheet } from 'react-native';

const cardStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 17,
      borderColor: '#E5E7EB',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      marginHorizontal: 24,
      shadowRadius: 4,
      elevation: 2,
    },
    title: {
      fontSize: 14,
      fontFamily: 'Poppins-SemiBold', // <-- change font here
      color: '#111827',
      marginBottom: 4,
    },
    description: {
      fontSize: 12,
      color: '#4B5563',
    },
    footer: {
      paddingTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    avatar: {
      width: 35,
      height: 35,
      borderRadius: 35 / 2, // circle
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0', // optional fallback bg
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    button: {
      paddingVertical: 8,
      backgroundColor: '#C0C0C0',
    },
    addButton: {
      paddingVertical: 8,
      backgroundColor: '#4B4B4B',
    },
    text: {
      fontSize: 12,
    },
  });
export default cardStyles;
