import { Pressable, View } from 'react-native';
import Text from '../Text';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderProps } from './header.interface';
import headerStyles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Chip from '../Chips';
import { useState } from 'react';

const chipData = [
  { id: 'all', label: 'All', color: '#666666' },
  { id: 'pending', label: 'Pending', color: '#666666' },
  { id: 'completed', label: 'Completed', color: '#666666' },
];

const Header: React.FC<HeaderProps> = ({
  title,
  onPressAdd,
  bottomSheetHeader = false,
  subtitle = '',
  iconName = 'add',
  onFilterChange,
  showChips,
  showAdd,
}) => {
  const insets = useSafeAreaInsets();
  const styles = headerStyles(insets);
  const handleAdd = () => {
    onPressAdd?.();
  };

  const [selectedChip, setSelectedChip] = useState('All');
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {showAdd && (
          <Pressable onPress={handleAdd} hitSlop={10}>
            <Icon
              name={iconName}
              size={bottomSheetHeader ? 16 : 24}
              color="#14a3c7"
            />
          </Pressable>
        )}
      </View>
      {showChips && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }}>
          {chipData.map(chip => (
            <Chip
              id={chip.id}
              key={chip.label}
              label={chip.label}
              color={chip.color}
              selected={selectedChip === chip.label}
              onPress={() => {
                setSelectedChip(chip.label);
                onFilterChange?.(chip.label);
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Header;
