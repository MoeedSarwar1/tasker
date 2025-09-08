import React, { useState, useCallback } from 'react';
import { TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import searchBarStyles from './styles';
import debounce from 'lodash.debounce';

const Searchbar = ({ onSearch }: { onSearch?: (text: string) => void }) => {
  const styles = searchBarStyles();
  const [query, setQuery] = useState('');

  // debounce the onSearch function (only trigger after 500ms of no typing)
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (onSearch) {
        onSearch(text);
      }
    }, 500),
    [],
  );

  const handleChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.input}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        value={query}
        style={{ flex: 1 }}
        onChangeText={handleChange}
      />
      <Ionicons name="search" size={18} color="#333" />
    </View>
  );
};

export default Searchbar;
