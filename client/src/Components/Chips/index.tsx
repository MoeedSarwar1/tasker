// Chip Component
import React from 'react';
import { Pressable, Animated } from 'react-native';
import { useTheme } from '../../context/Theme-context';
import Text from '../Text';
import { chipStyles } from './styles';
import { ChipProps } from './interface';

const Chip: React.FC<ChipProps> = ({
  id,
  label,
  selected = false,
  textColor,
  onPress,
  color = '#2563EB', // default primary color
}) => {
  const { theme } = useTheme();
  const styles = chipStyles(theme);
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        id={id}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.chip,
          selected && {
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
          },
          pressed && { opacity: 0.9 },
        ]}
        android_ripple={{
          color: selected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
          borderless: false,
        }}
      >
        <Text
          style={[
            styles.text,
            selected && {
              color: textColor || '#FFFFFF',
              fontWeight: '600',
            },
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Chip;
