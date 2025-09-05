import { Pressable, Text } from 'react-native';
import { ButtonProps } from './interface';
import buttonStyles from './styles';

const Button = ({
  title,
  onPress,
  children,
  style,
  textStyle,
}: ButtonProps) => {
  const styles = buttonStyles();

  const handlePress = () => {
    onPress && onPress();
  };
  return (
    <Pressable onPress={handlePress} style={[styles.container, style]}>
      {children}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};
export default Button;
