import { Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getTaskStatusText } from '../../utils/dateFormat';
import cardStyles from './styles';
import { Task } from './task.interface';
import Text from '../Text';
import { useState } from 'react';
import { useTheme } from '../../context/Theme-context';
import { useAuth } from '../../context/Auth-context';

const TaskCard = ({ item, onChange, onMorePress }: Task) => {
  const { theme } = useTheme();
  const style = cardStyles(theme);
  const [showDescription, setShowDescription] = useState(false);
  const { user } = useAuth();

  const onStatusChange = () => {
    if (!item.completed) {
      // Only mark as completed if not already completed
      onChange?.(item._id, true);
    }
  };

  return (
    <Pressable
      style={style.container}
      onPress={() => setShowDescription(!showDescription)}
    >
      <View style={style.header}>
        <Pressable onPress={onStatusChange} hitSlop={10}>
          {item.completed ? (
            <Icon
              name="checkbox-marked-outline"
              size={24}
              color={theme.colors.primaryIcon}
            />
          ) : (
            <Icon
              name="checkbox-blank-outline"
              size={24}
              color={theme.colors.secondaryIcon}
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
            {getTaskStatusText(item.completed, item.dueDate)} • {item.priority}
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
          <Pressable onPress={onMorePress} hitSlop={10}>
            <Icon name="dots-horizontal" size={20} color="#9ca3af" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default TaskCard;
