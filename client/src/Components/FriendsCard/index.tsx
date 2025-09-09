import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Text from '../Text';
import { Friends } from './friends.interface';
import cardStyles from './styles';
import Button from '../Button';

const FriendsCard = ({
  item,
  onSecondaryPress,
  onPrimaryPress,
  buttons = true,
}: Friends) => {
  const style = cardStyles();
  const [showButtons, setShowButtons] = useState(false);

  return (
    <Pressable
      style={style.container}
      onPress={() => setShowButtons(!showButtons)}
    >
      <View style={style.header}>
        <View style={style.avatar}>
          <SvgXml xml={item.avatar} width={35} height={35} />
        </View>

        <View>
          <Text style={[style.title]}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={style.description}>{item.email}</Text>
        </View>
      </View>
      {buttons && showButtons && (
        <View style={style.footer}>
          <View style={style.buttonRow}>
            <View style={{ flex: 1 }}>
              <Button
                title="Dismiss"
                style={style.button}
                textStyle={style.text}
                onPress={onSecondaryPress}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                textStyle={style.text}
                title={item.isFriend ? 'Remove' : 'Add'} // ✅ derived from array
                style={style.addButton}
                onPress={onPrimaryPress}
              />
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default FriendsCard;
