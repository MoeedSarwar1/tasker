import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  color?: string; // background color when selected
}

const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  color = '#2563EB', // default primary color
}) => {
  return (
    <Pressable
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

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#111827',
  },
});

export default Chip;
