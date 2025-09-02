import { Pressable, Text, View } from 'react-native';
import linkStyles from './styles';
import { LinkTextProps } from './interface';

const LinkText = ({ text, pressableText, onPress }: LinkTextProps) => {
  const styles = linkStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{text}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.linkText}>{pressableText}</Text>
      </Pressable>
    </View>
  );
};
export default LinkText;
