import { Text, View } from 'react-native';
import cardStyles from './styles';

const TaskCard = ({ item }) => {
  const style = cardStyles();
  return (
    <View style={style.container}>
      <Text style={style.title}>{item.title}</Text>
      <Text style={style.description}>{item.description}</Text>
      <Text style={style.date}>{item.createdAt}</Text>
    </View>
  );
};

export default TaskCard;
