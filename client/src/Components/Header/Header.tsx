import { Pressable, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderProps } from './header.interface';
import headerStyles from './styles';

const Header: React.FC<HeaderProps> = ({
  title,
  onPressAdd,
  bottomSheetHeader = false,
  iconName = 'add',
}) => {
  const styles = headerStyles(bottomSheetHeader);
  const handleAdd = () => {
    onPressAdd?.();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={handleAdd} hitSlop={10}>
        <Icon
          name={iconName}
          size={bottomSheetHeader ? 16 : 24}
          color="#14a3c7"
        />
      </Pressable>
    </View>
  );
};

export default Header;
