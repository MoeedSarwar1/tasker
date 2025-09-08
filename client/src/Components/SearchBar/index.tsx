import React, { useState, useCallback, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import debounce from 'lodash.debounce';
import searchBarStyles from './styles';

const Searchbar = ({
  onSearch,
  clearTrigger,
}: {
  onSearch?: (text: string) => void;
  clearTrigger?: any; // changes whenever you want it to reset
}) => {
  const styles = searchBarStyles();
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      onSearch?.(text);
    }, 500),
    [onSearch],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  // ✅ reset whenever `clearTrigger` changes
  useEffect(() => {
    setQuery('');
    onSearch?.('');
  }, [clearTrigger]);

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
