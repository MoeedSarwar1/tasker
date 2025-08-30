import { Alert, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import cardStyles from './styles';
import { Task } from './task.interface';

const TaskCard = ({ item, onDelete, onChange }: Task) => {
  const style = cardStyles();

  const handleDelete = () => {
    onDelete?.(item._id);
    Alert.alert(`'${item.title}' Deleted Successfully`);
  };

  const onStatusChange = () => {
    if (typeof item.completed !== 'undefined') {
      onChange?.(item._id, !item.completed);
    }
  };
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Pressable onPress={onStatusChange} hitSlop={10}>
          {item.completed ? (
            <Icon name="check-circle" size={24} color="#22C55E" />
          ) : (
            <Icon
              name="checkbox-blank-circle-outline"
              size={24}
              color="#667EEA"
            />
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
            {item.completed
              ? 'Completed'
              : `Due ${new Date(item.createdAt as Date).toLocaleDateString()}`}
          </Text>
        </View>
      </View>
      <View style={style.footer}>
        <Text style={style.user}>Team</Text>
        <View style={style.date}>
          <Icon name="dots-horizontal" size={16} color="#9ca3af" />
        </View>
      </View>
    </View>
  );
};

export default TaskCard;
