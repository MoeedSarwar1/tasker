import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import searchBarStyles from './styles';
const Searchbar = () => {
  const styles = searchBarStyles();
  const [query, setquery] = useState('');
  return (
    <View style={styles.input}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        value={query}
        style={{ flex: 1 }}
        onChangeText={setquery}
      />
      <Icons name="search" size={18} color="#333" />
    </View>
  );
};
export default Searchbar;
