import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Text from '../Text';
import { Friends } from './friends.interface';
import cardStyles from './styles';
import Button from '../Button';
import { useTheme } from '../../context/Theme-context';
import LinearGradient from 'react-native-linear-gradient';

const FriendsCard = ({
  item,
  onSecondaryPress,
  onPrimaryPress,
  buttonRow = false,
  title,
  buttons = true,
}: Friends) => {
  const { theme } = useTheme();
  const style = cardStyles(theme);
  const [showButtons, setShowButtons] = useState(false);

  const user = item.sender ?? item.receiver ?? item;
  // Derive button title from FriendRequest status
  const getButtonTitle = () => {
    if (user.isFriend) return 'Remove';

    // If the request was sent by me
    if (user.status === 'sent') return 'Requested';

    // If the request was received by me
    if (user.status === 'pending') return 'Accept';
    if (user.status === 'rejected') return 'Send Request';

    return title ?? 'Send Request';
  };

  const isButtonDisabled = () => {
    // disable when request is already sent or pending
    return user.status === 'sent' || user.status === 'pending';
  };

  return (
    <Pressable
      style={style.container}
      onPress={() => setShowButtons(!showButtons)}
    >
      <LinearGradient
        colors={theme.colors.friendsCard}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={style.gradientContainer}
      >
        <View style={style.content}>
        <View style={style.header}>
          <View style={style.avatar}>
            <SvgXml xml={user.avatar} width={35} height={35} />
          </View>

          <View>
            <Text style={[style.title]}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={style.description}>{user.email}</Text>
          </View>
        </View>

        {buttons && showButtons && (
          <View style={style.footer}>
            <View style={style.buttonRow}>
              {buttonRow && (
                <View style={style.flex}>
                  <Button
                    title="Reject"
                    style={style.button}
                    textStyle={style.buttonText}
                    onPress={onSecondaryPress}
                  />
                </View>
              )}

              <View style={style.flex}>
                <Button
                  textStyle={style.addButtonText}
                  title={getButtonTitle()}
                  style={[
                    style.addButton,
                    isButtonDisabled() && { opacity: 0.6 }, // dim the button if disabled
                  ]}
                  disabled={isButtonDisabled()}
                  onPress={onPrimaryPress}
                />
              </View>
            </View>
          </View>
        )}
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default FriendsCard;
