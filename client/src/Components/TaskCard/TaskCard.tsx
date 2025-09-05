import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import cardStyles from './styles';
import { Task } from './task.interface';
import { getTaskStatusText } from '../../utils/dateFormat';

const TaskCard = ({ item, onChange, onMorePress }: Task) => {
  const style = cardStyles();

  const onStatusChange = () => {
    if (!item.completed) {
      // Only mark as completed if not already completed
      onChange?.(item._id, true);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Pressable onPress={onStatusChange} hitSlop={10}>
          {item.completed ? (
            <Icon name="checkbox-marked-outline" size={24} color="#22C55E" />
          ) : (
            <Icon name="checkbox-blank-outline" size={24} color="#D1D5DB" />
          )}
        </Pressable>

        <View>
          <Text
            style={[
              style.title,
              item.completed && { textDecorationLine: 'line-through' },
            ]}
          >
            {item.title}
          </Text>
          <Text style={style.description}>
            {getTaskStatusText(item.completed, item.dueDate)} • {item.priority}
          </Text>
        </View>
      </View>
      <View style={style.footer}>
        <Text style={style.user}>{item.assignedTo ?? 'Myself'}</Text>
        <View style={style.date}>
          <Pressable onPress={onMorePress} hitSlop={10}>
            <Icon name="dots-horizontal" size={20} color="#9ca3af" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;
