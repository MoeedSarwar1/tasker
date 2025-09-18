import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../context/Auth-context';
import { useTheme } from '../../context/Theme-context';
import { getTaskStatusText } from '../../utils/dateFormat';
import Text from '../Text';
import cardStyles from './styles';
import { Task } from './task.interface';
import LinearGradient from 'react-native-linear-gradient';

const TaskCard = ({ item, onChange, onMorePress }: Task) => {
  const { theme } = useTheme();
  const style = cardStyles(theme);
  const [showDescription, setShowDescription] = useState(false);
  const { user } = useAuth();

  const isMyTask = item?.user?._id === user?.id;
  const onStatusChange = () => {
    const nextValue = !item.completed; // or whatever property you track
    onChange?.(item._id, nextValue);
  };

  return (
    <Pressable
      style={style.container}
      onPress={() => setShowDescription(!showDescription)}
    >
      <LinearGradient
        colors={theme.colors.taskCard}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={style.gradientContainer}
      >
        <View style={style.header}>
          <Pressable disabled={!isMyTask} onPress={onStatusChange} hitSlop={10}>
            {item.completed ? (
              <Icon
                name="checkbox-marked-outline"
                size={24}
                color={
                  !isMyTask
                    ? theme.colors.disabledPrimaryIcon
                    : theme.colors.primaryIcon
                }
              />
            ) : (
              <Icon
                name="checkbox-blank-outline"
                size={24}
                color={
                  !isMyTask
                    ? theme.colors.disabledSecondaryIcon
                    : theme.colors.secondaryIcon
                }
              />
            )}
          </Pressable>

          <View style={{ width: '85%' }}>
            <Text
              style={[
                style.title,

                item.completed && { textDecorationLine: 'line-through' },
              ]}
            >
              {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
            </Text>
            <Text style={style.description}>
              {getTaskStatusText(item.completed, item.dueDate)} •{' '}
              {item.priority}
            </Text>
          </View>
        </View>
        {showDescription && (
          <View>
            <Text style={style.details}>
              {item.description.charAt(0).toUpperCase() +
                item.description.slice(1)}
            </Text>
          </View>
        )}
        <View style={style.footer}>
          <Text style={style.user}>
            {item.user?._id?.toString() === user?.id?.toString()
              ? `${user?.firstName} ${user?.lastName}`
              : `${item.user?.firstName || ''} ${item.user?.lastName || ''}`}
          </Text>
          <View style={style.date}>
            <Pressable
              onPress={onMorePress}
              // Disable only if the task userId is not mine
              disabled={!isMyTask}
              hitSlop={10}
            >
              <Icon
                name="dots-horizontal"
                size={20}
                color={
                  !isMyTask
                    ? theme.colors.disabledPrimaryIcon
                    : theme.colors.primaryIcon
                }
              />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default TaskCard;
