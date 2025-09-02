import { Pressable, Text } from 'react-native';
import { ButtonProps } from './interface';
import buttonStyles from './styles';

const Button = ({ title, onPress }: ButtonProps) => {
  const styles = buttonStyles();

  const handlePress = () => {
    onPress && onPress();
  };
  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};
export default Button;
