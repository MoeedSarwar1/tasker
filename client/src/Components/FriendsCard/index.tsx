import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Text from '../Text';
import { Friends } from './friends.interface';
import cardStyles from './styles';

const FriendsCard = ({ item }: Friends) => {
  const style = cardStyles();
  const [showButtons, setShowButtons] = useState(false);

  return (
    <Pressable
      style={style.container}
      onPress={() => setShowButtons(!showButtons)}
    >
      <View>
        <View>
          <Text style={[style.title]}>
            {item.firstName}
            {item.lastName}
          </Text>
          <Text style={style.description}>{item.email}</Text>
        </View>
      </View>
      {showButtons && <View style={style.footer} />}
    </Pressable>
  );
};

export default FriendsCard;
