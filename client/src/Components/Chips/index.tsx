import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Text from '../Text';
import { useTheme } from '../../context/Theme-context';
import { chipStyles } from './styles';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  color?: string; // background color when selected
  id?: string;
}

const Chip: React.FC<ChipProps> = ({
  id,
  label,
  selected = false,
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
      <Text style={[styles.text, selected && { color: '#fff' }]}>{label}</Text>
    </Pressable>
  );
};

export default Chip;
