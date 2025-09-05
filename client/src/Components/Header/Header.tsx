import { Pressable, View } from 'react-native';
import Text from '../Text';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderProps } from './header.interface';
import headerStyles from './styles';

const Header: React.FC<HeaderProps> = ({
  title,
  onPressAdd,
  bottomSheetHeader = false,
  subtitle = '',
  iconName = 'add',
}) => {
  const styles = headerStyles();
  const handleAdd = () => {
    onPressAdd?.();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
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
