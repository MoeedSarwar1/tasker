import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Material from 'react-native-vector-icons/MaterialIcons';
import CustomBottomSheet from '../../Components/BottomSheet';
import FriendsCard from '../../Components/FriendsCard';
import Header from '../../Components/Header/Header';
import Searchbar from '../../Components/SearchBar';
import Text from '../../Components/Text';
import { useModal } from '../../context/Modal-context';
import { useTheme } from '../../context/Theme-context';
import {
  acceptFriendRequest,
  allRequests,
  fetchFriends,
  rejectFriendRequest,
  removeFriend,
  sendFriendRequest,
} from '../../network/Friends';
import { fetchUsers } from '../../network/User';
import friendsStyles from './styles';

const FriendsScreen = () => {
  const snapPoints = useMemo(() => ['90%'], []);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [selectedTab, setSelectedTab] = useState<'friends' | 'requests'>(
    'friends',
  );
  const [friends, setFriends] = useState<any[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<any[]>([]);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState<any[]>([]);
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

  const loadRequests = async () => {
    try {
      setRefreshing(true);
      const data = await allRequests(); // returns user objects of friends
      setRequests(data);
      setFilteredRequests(data);
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
  const handleRejectRequest = async (requestID: string) => {
    try {
      setRefreshing(true);
      const data = await rejectFriendRequest(requestID); // returns user objects of friends
      setRequests(data);
      setFilteredRequests(data);
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
  const handleAddFriend = async (requestId: string) => {
    try {
      const addedFriend = await acceptFriendRequest(requestId);

      // ✅ Safely update friends (avoid duplicates)
      setFriends(prev =>
        prev.some(friend => friend._id === addedFriend._id)
          ? prev
          : [...prev, addedFriend],
      );
      setFilteredFriends(prev =>
        prev.some(friend => friend._id === addedFriend._id)
          ? prev
          : [...prev, addedFriend],
      );

      // ✅ Remove the accepted request
      setRequests(prev => prev.filter(request => request._id !== requestId));
      setFilteredRequests(prev =>
        prev.filter(request => request._id !== requestId),
      );

      // ✅ Success modal
      showModal({
        title: 'All Set',
        description: 'Friend added successfully 🎉',
        iconName: 'checkbox-marked-circle-outline',
        iconColor: '#28A745',
        buttonRow: false,
      });

      // Don’t hide modal instantly, let user read it (optional)
      // If you still want it to auto-close:
      // setTimeout(() => handleHideModal(), 1500);
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
        description: error?.response?.data?.message || 'Something went wrong',
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
    loadRequests();
  }, []);

  // ✅ Search users
  const handleSearchUsers = (text: string) => {
    if (!text.trim()) {
      setFilteredUsers([]);
      return;
    }

    const results = users.filter(
      user =>
        (user?.firstName?.includes(text) ||
          user?.lastName?.includes(text) ||
          user?.email?.includes(text)) ??
        false,
    );
    setFilteredUsers(results);
  };

  const handleFriendRequestSend = async email => {
    try {
      const data = await sendFriendRequest(email);

      showModal({
        title: 'All Set',
        description: `Request Sent successfully 🎉`,
        iconName: 'checkbox-marked-circle-outline',
        iconColor: '#28A745',
        buttonRow: false,
      });
      bottomSheetRef?.current?.close();
      return setRequests(data);
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
  // ✅ Search friends
  const handleSearch = (text: string) => {
    if (!text.trim()) {
      setFilteredFriends(friends);
      setFilteredRequests(requests);
      return;
    }

    const lower = text.toLowerCase();

    const friendResults = friends.filter(
      friend =>
        friend?.firstName?.toLowerCase().includes(lower) ||
        friend?.lastName?.toLowerCase().includes(lower),
    );

    const requestResults = requests.filter(
      req =>
        req?.firstName?.toLowerCase().includes(lower) ||
        req?.lastName?.toLowerCase().includes(lower),
    );

    setFilteredFriends(friendResults);
    setFilteredRequests(requestResults);
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

        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Pressable onPress={() => setSelectedTab('friends')}>
            <Text
              style={[
                styles.subtitle,
                selectedTab === 'friends' && {
                  fontWeight: 'bold',
                  color: theme.colors.primaryTextColor,
                },
              ]}
            >
              All Co-workers ({filteredFriends.length})
            </Text>
          </Pressable>

          <Pressable onPress={() => setSelectedTab('requests')}>
            <Text
              style={[
                styles.subtitle,
                selectedTab === 'requests' && {
                  fontWeight: 'bold',
                  color: theme.colors.primaryTextColor,
                },
              ]}
            >
              Requests ({requests.length || 0})
            </Text>
          </Pressable>
        </View>

        {selectedTab === 'friends' ? (
          filteredFriends.length === 0 ? (
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
                  item={{ ...item, isFriend: true }}
                  onPrimaryPress={() =>
                    handleRemoveFriend(item.firstName, item.lastName)
                  }
                />
              )}
            />
          )
        ) : filteredRequests.length === 0 ? (
          nothingToShow(false, 'No Requests Yet', 'person-outline')
        ) : (
          <FlatList
            data={requests}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            contentContainerStyle={styles.flatlistContainer}
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({ item }) => (
              <FriendsCard
                title="Accept Request"
                buttonRow
                item={{ ...item, isFriend: false }}
                onPrimaryPress={() => {
                  // ✅ Accept request here
                  handleAddFriend(item._id);
                }}
                onSecondaryPress={() => {
                  handleRejectRequest(item._id);
                }}
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
                        : handleFriendRequestSend(item.email)
                    }
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
