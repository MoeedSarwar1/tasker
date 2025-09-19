import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../Components/Header/Header';
import { useTheme } from '../../context/Theme-context';
import React, { useLayoutEffect } from 'react';
import { taskDetailsStyles } from './styles';
import { getTaskStatusText } from '../../utils/dateFormat';
import { scale } from 'react-native-size-matters';

export const TaskDetails = () => {
  const route = useRoute();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { title, completed, dueDate, priority, description, createdBy } =
    route.params;
  const styles = taskDetailsStyles(theme);

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          {
            backgroundColor: theme.colors.bottomNavBackground,
            borderTopWidth: 0,
            paddingTop: 0,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          },
          Platform.OS === 'android' && {
            height: 75,
            elevation: 0,
            shadowOpacity: 0,
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

  const getPriorityColor = priority => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return theme.colors.secondaryIcon;
    }
  };

  const getPriorityIcon = priority => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'flag';
      case 'medium':
        return 'flag-outline';
      case 'low':
        return 'flag-variant-outline';
      default:
        return 'flag-outline';
    }
  };

  return (
    <>
      <Header title="Task Details" iconName="arrow-back" showBack />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Task Status Icon */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIconContainer,
              {
                backgroundColor: completed
                  ? theme.colors.primaryButtonBackground + '15'
                  : theme.colors.secondaryIcon + '15',
              },
            ]}
          >
            <Icon
              name={completed ? 'check-circle' : 'clock-outline'}
              size={scale(32)}
              color={
                completed
                  ? theme.colors.primaryIcon
                  : theme.colors.secondaryIcon
              }
            />
          </View>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text
              style={[
                styles.statusText,
                {
                  color: completed
                    ? theme.colors.primaryIcon
                    : theme.colors.secondaryIcon,
                },
              ]}
            >
              {completed ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>

        {/* Task Title */}
        <View style={styles.titleSection}>
          <Text style={styles.titleLabel}>Task</Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Task Meta Information */}
        <View style={styles.metaSection}>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <View style={styles.metaIconContainer}>
                <Icon
                  name="calendar-clock"
                  size={scale(18)}
                  color={theme.colors.primaryIcon}
                />
              </View>
              <View>
                <Text style={styles.metaLabel}>Due Date</Text>
                <Text style={styles.metaValue}>
                  {getTaskStatusText(completed, dueDate)}
                </Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <View
                style={[
                  styles.metaIconContainer,
                  { backgroundColor: getPriorityColor(priority) + '15' },
                ]}
              >
                <Icon
                  name={getPriorityIcon(priority)}
                  size={scale(18)}
                  color={getPriorityColor(priority)}
                />
              </View>
              <View>
                <Text style={styles.metaLabel}>Priority</Text>
                <Text
                  style={[
                    styles.metaValue,
                    { color: getPriorityColor(priority) },
                  ]}
                >
                  {priority || 'Not set'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <View style={styles.metaIconContainer}>
                <Icon
                  name="account-circle"
                  size={scale(18)}
                  color={theme.colors.primaryIcon}
                />
              </View>
              <View>
                <Text style={styles.metaLabel}>Created by</Text>
                <Text style={styles.metaValue}>{createdBy || 'Unknown'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Task Description */}
        {description && (
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
        )}

        {/* Additional Actions or Info could go here */}
        <View style={styles.footerSection}>
          <View style={styles.footerItem}>
            <Icon
              name="information-outline"
              size={scale(16)}
              color={theme.colors.secondaryIcon}
            />
            <Text style={styles.footerText}>
              Task created and managed through Tasuku
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
