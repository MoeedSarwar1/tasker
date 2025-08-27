import { Pressable, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderProps } from './header.interface';
import styles from './styles';

const Header: React.FC<HeaderProps> = ({ title, onPressAdd }) => {
  const handleAdd = () => {
    onPressAdd?.();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={handleAdd}>
        <Icon name="add" size={24} color="#14a3c7" />
      </Pressable>
    </View>
  );
};

export default Header;
