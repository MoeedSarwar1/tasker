import { Pressable, View } from 'react-native';
import linkStyles from './styles';
import Text from '../Text';
import { LinkTextProps } from './interface';
import { useTheme } from '../../context/Theme-context';

const LinkText = ({
  text,
  pressableText,
  onPress,
  disabled,
}: LinkTextProps) => {
  const { theme } = useTheme();
  const styles = linkStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{text}</Text>
      <Pressable onPress={onPress} disabled={disabled}>
        <Text style={styles.linkText}>{pressableText}</Text>
      </Pressable>
    </View>
  );
};
export default LinkText;
