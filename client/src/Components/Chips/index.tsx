import React from 'react';
import { Pressable } from 'react-native';
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
  return (
    <Pressable
      id={id}
      onPress={onPress}
      style={[
        styles.chip,
        selected && { backgroundColor: color, borderColor: color },
      ]}
    >
      <Text style={[styles.text, selected && { color: textColor || '#fff' }]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default Chip;
