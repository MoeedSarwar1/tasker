import React, { useState, useCallback, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import debounce from 'lodash.debounce';
import searchBarStyles from './styles';
import { useTheme } from '../../context/Theme-context';

const Searchbar = ({
  onSearch,
  clearTrigger,
}: {
  onSearch?: (text: string) => void;
  clearTrigger?: any; // changes whenever you want it to reset
}) => {
  const { theme } = useTheme();
  const styles = searchBarStyles(theme);
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
        style={{ flex: 1, color: theme.colors.inputTextColor }}
        placeholderTextColor={theme.colors.placeholderTextColor} // ✅ correct
        value={query}
        onChangeText={handleChange}
      />
      <Ionicons name="search" size={18} color={theme.colors.primaryIcon} />
    </View>
  );
};

export default Searchbar;
