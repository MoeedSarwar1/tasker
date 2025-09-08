import React from 'react';
import { View } from 'react-native';
import Header from '../../Components/Header/Header';
import Text from '../../Components/Text';
import friendsStyles from './styles';
import Searchbar from '../../Components/SearchBar';

const FriendsScreen = () => {
  const styles = friendsStyles();
  return (
    <>
      <Header title="Friends" />

      <View style={styles.container}>
        <Searchbar/>
      </View>
    </>
  );
};

export default FriendsScreen;
