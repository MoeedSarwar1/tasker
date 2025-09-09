import { Pressable, View } from 'react-native';
import Text from '../Text';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderProps } from './header.interface';
import headerStyles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Chip from '../Chips';
import { useState } from 'react';
import { useTheme } from '../../context/Theme-context';

const Header: React.FC<HeaderProps> = ({
  title,
  onPressAdd,
  subtitle = '',
  iconName = 'add',
  onFilterChange,
  showChips,
  showAdd,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = headerStyles(insets, theme);
  const handleAdd = () => {
    onPressAdd?.();
  };

  const [selectedChip, setSelectedChip] = useState('All');
  const chipData = [
    {
      id: 'all',
      label: 'All',
      color: theme.colors.chips.allBackground,
      textColor: theme.colors.chips.allText,
    },
    {
      id: 'pending',
      label: 'Pending',
      color: theme.colors.chips.pendingBackground,
      textColor: theme.colors.chips.pendingText,
    },
    {
      id: 'completed',
      label: 'Completed',
      color: theme.colors.chips.completedBackground,
      textColor: theme.colors.chips.completedText,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {showAdd && (
          <Pressable onPress={handleAdd} hitSlop={10}>
            <Icon name={iconName} size={24} color={theme.colors.primaryIcon} />
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
