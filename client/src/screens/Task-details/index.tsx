import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../Components/Header/Header';
import { useTheme } from '../../context/Theme-context';
import { useLayoutEffect } from 'react';
import { taskDetailsStyles } from './styles';

export const TaskDetails = () => {
  const route = useRoute();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { title } = route.params;
  const styles = taskDetailsStyles(theme);

  useLayoutEffect(() => {
    const parent = navigation.getParent();

    // Hide tab bar
    parent?.setOptions({
      tabBarStyle: { display: 'none' },
    });

    // Restore tab bar when leaving
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          {
            backgroundColor: theme.colors.headerBackground,
            borderTopWidth: 0,
            paddingTop: 0,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          },
          Platform.OS === 'android' && {
            height: 75,
            elevation: 0, // Remove Android elevation shadow
            shadowOpacity: 0, // Remove iOS shadow
          },
        ].filter(Boolean),
        tabBarItemStyle: Platform.select({
          android: {
            height: 47,
            paddingVertical: 0,
            marginVertical: 4,
          },
          ios: {
            height: 50,
            paddingTop: 5,
          },
        }),
      });
    };
  }, [navigation]);

  return (
    <>
      <Header title="Details" iconName="arrow-back" showBack />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}

      >  <View>
          <Text style={styles.sectionTitle}>{title}</Text>
</View>
      </ScrollView>
    </>
  );
};
