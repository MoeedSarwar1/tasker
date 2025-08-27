import { Alert, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import cardStyles from './styles';
import { Task } from './task.interface';

const TaskCard = ({ item, onDelete, loadingCard }: Task) => {
  const style = cardStyles(loadingCard);

  const handleDelete = () => {
    onDelete?.(item._id);
    Alert.alert(`'${item.title}' Deleted Successfully`);
  };
  return (
    <View style={style.container}>
      <View style={style.header}>
        {!loadingCard && (
          <Pressable onPress={() => handleDelete()}>
            <Icon name="delete" size={16} color="red" />
          </Pressable>
        )}
        <View>
          <Text style={style.title}>{item.title}</Text>
          <Text style={style.description}>{item.description}</Text>
        </View>
      </View>
      {!loadingCard && (
        <Text style={style.date}>
          {new Date(item.createdAt as Date).toLocaleDateString()}
        </Text>
      )}
    </View>
  );
};

export default TaskCard;
