import React from 'react';
import { View } from 'react-native';
import Header from '../../Components/Header/Header';
import Searchbar from '../../Components/SearchBar';
import friendsStyles from './styles';

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
