import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import CustomBottomSheet from '../../Components/BottomSheet';
import FriendsCard from '../../Components/FriendsCard';
import Header from '../../Components/Header/Header';
import Searchbar from '../../Components/SearchBar';
import Text from '../../Components/Text';
import { useModal } from '../../context/Modal-context';
import { addFriends, fetchFriends, removeFriend } from '../../network/Friends';
import friendsStyles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchUsers } from '../../network/User';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Material from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/Theme-context';

const FriendsScreen = () => {
  const snapPoints = useMemo(() => ['90%'], []);
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const [friends, setFriends] = useState<any[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchResetKey, setSearchResetKey] = useState(0);

  const handleHideModal = () => {
    bottomSheetRef.current?.close();
    setSearchResetKey(prev => prev + 1); // trigger reset
  };

  const { showModal } = useModal();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = friendsStyles(theme, insets);

  const handlePresentModal = () => bottomSheetRef.current?.expand();

  const nothingToShow = (
    hasData: boolean,
    message: string = 'Nothing To Show',
    icon: string,
  ) => {
    return (
      <View style={styles.emptyContainer}>
        {!hasData && (
          <>
            <Material
              name={icon}
              size={64}
              color={theme.colors.secondaryIcon}
            />
            <Text style={styles.emptyTextStyle}>{message}</Text>
          </>
        )}
      </View>
    );
  };
  // ✅ Load current friends
  const loadFriends = async () => {
    try {
      setRefreshing(true);
      const data = await fetchFriends(); // returns user objects of friends
      setFriends(data);
      setFilteredFriends(data);
    } catch (error) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        iconColor: '#DC3545',
        title: 'Something Went Wrong,',
        description: 'Friends didn’t load. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => onRefresh(),
      });
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ Load all users
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers([]); // empty until search
    } catch (error) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        iconColor: '#DC3545',
        title: 'Something Went Wrong,',
        description: 'Users didn’t load. Check your connection and retry.',
        buttonRow: false,
      });
    }
  };

  // ✅ Add Friend
  const handleAddFriend = async (firstName: string, lastName: string) => {
    try {
      console.log('Adding friend:', firstName, lastName); // 👀 debug
      const addedFriend = await addFriends(firstName, lastName);

      setFriends(prev => [...prev, addedFriend]);
      setFilteredFriends(prev => [...prev, addedFriend]);

      showModal({
        title: 'All Set',
        description: `${firstName} ${lastName} added successfully 🎉`,
        iconName: 'checkbox-marked-circle-outline',
        iconColor: '#28A745',
        buttonRow: false,
      });

      handleHideModal();
    } catch (error: any) {
      console.error(
        'Add friend failed:',
        error?.response?.data || error.message,
      );
      showModal({
        mode: 'error',
        iconName: 'account-cancel-outline',
        iconColor: '#DC3545',
        title: 'Could not add friend',
        description: error?.response?.data?.message || 'User not found',
        buttonRow: false,
      });
    }
  };

  const handleRemoveFriend = async (firstName: string, lastName: string) => {
    try {
      const removedFriend = await removeFriend(firstName, lastName);

      setFriends(prev => prev.filter(f => f._id !== removedFriend));
      setFilteredFriends(prev => prev.filter(f => f._id !== removedFriend));

      showModal({
        title: 'All Set',
        description: `${firstName} ${lastName} Removed successfully 🎉`,
        iconName: 'checkbox-marked-circle-outline',
        iconColor: '#28A745',
        buttonRow: false,
      });

      handleHideModal();
      loadFriends();
    } catch (error: any) {
      console.error(
        'Add friend failed:',
        error?.response?.data || error.message,
      );
      showModal({
        mode: 'error',
        iconName: 'account-cancel-outline',
        iconColor: '#DC3545',
        title: 'Could not remove friend',
        description: error?.response?.data?.message || 'User not found',
        buttonRow: false,
      });
    }
  };

  // ✅ Refresh
  const onRefresh = async () => {
    await loadFriends();
  };

  useEffect(() => {
    loadFriends();
    loadUsers();
  }, []);

  // ✅ Search users
  const handleSearchUsers = (text: string) => {
    if (!text.trim()) {
      setFilteredUsers([]);
      return;
    }

    const results = users.filter(
      user =>
        (user?.firstName?.includes(text) || user?.lastName?.includes(text)) ??
        false,
    );
    setFilteredUsers(results);
  };

  // ✅ Search friends
  const handleSearch = (text: string) => {
    if (!text.trim()) {
      setFilteredFriends(friends);
      return;
    }

    const results = friends.filter(
      friend =>
        (friend?.firstName?.includes(text) ||
          friend?.lastName?.includes(text)) ??
        false,
    );
    setFilteredFriends(results);
  };

  // ✅ Add friend status to search results
  const usersWithStatus = filteredUsers.map(u => ({
    ...u,
    isFriend: friends.some(f => f._id === u._id),
  }));

  return (
    <>
      <Header title="Co-workers" showAdd onPressAdd={handlePresentModal} />

      <View style={styles.container}>
        <Searchbar onSearch={handleSearch} />

        <Text style={styles.subtitle}>
          All Co-workers ({filteredFriends.length})
        </Text>

        {filteredFriends.length === 0 ? (
          nothingToShow(false, 'Connect to Continue', 'person-add-alt')
        ) : (
          <FlatList
            data={filteredFriends.sort((a, b) =>
              `${a.firstName} ${a.lastName}`.localeCompare(
                `${b.firstName} ${b.lastName}`,
              ),
            )}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            contentContainerStyle={styles.flatlistContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({ item }) => (
              <FriendsCard
                item={{ ...item, isFriend: true }} // ✅ always a friend in this list
                onPrimaryPress={() =>
                  handleRemoveFriend(item.firstName, item.lastName)
                }
                onSecondaryPress={() => {}}
              />
            )}
          />
        )}
      </View>

      <CustomBottomSheet
        ref={bottomSheetRef}
        onClose={handleHideModal}
        snapPoints={snapPoints}
        title="Add Co-workers"
      >
        <View style={styles.top}>
          <Searchbar
            onSearch={handleSearchUsers}
            clearTrigger={searchResetKey}
          />

          {usersWithStatus.length > 0 ? (
            <>
              <Text style={styles.subtitle}>
                Search Results ({usersWithStatus.length})
              </Text>

              <FlatList
                data={usersWithStatus.sort((a, b) =>
                  `${a.firstName} ${a.lastName}`.localeCompare(
                    `${b.firstName} ${b.lastName}`,
                  ),
                )}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                contentContainerStyle={styles.flatlistContainer}
                keyExtractor={(item, index) => item._id || index.toString()}
                renderItem={({ item }) => (
                  <FriendsCard
                    item={item}
                    onPrimaryPress={() =>
                      item.isFriend
                        ? handleRemoveFriend(item.firstName, item.lastName)
                        : handleAddFriend(item.firstName, item.lastName)
                    }
                    onSecondaryPress={() => {}}
                  />
                )}
              />
            </>
          ) : (
            nothingToShow(false, 'No users found', 'no-accounts')
          )}
        </View>
      </CustomBottomSheet>
    </>
  );
};

export default FriendsScreen;
