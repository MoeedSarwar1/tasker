import React from 'react';
import { Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../Text';
import { ButtonProps } from './interface';
import buttonStyles from './styles';
import { useTheme } from '../../context/Theme-context';

const Button = ({
  title,
  onPress,
  children,
  style,
  disabled,
  textStyle,
  gradientColors,
}: ButtonProps & { gradientColors?: string[] }) => {
  const { theme } = useTheme();
  const styles = buttonStyles();

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <LinearGradient
      colors={gradientColors || theme.colors.primaryButtonBackground} // default luxury gold
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.radius}
    >
      <Pressable
        disabled={disabled}
        onPress={handlePress}
        style={[styles.container, style]}
      >
        {children}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </Pressable>
    </LinearGradient>
  );
};

export default Button;
