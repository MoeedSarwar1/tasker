import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  View,
} from 'react-native';
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
  const [loading, setLoading] = useState(true); // main loader
  const [searchText, setSearchText] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResetKey, setSearchResetKey] = useState(0);

  const { showModal } = useModal();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = friendsStyles(theme, insets);

  const handleHideModal = () => {
    bottomSheetRef.current?.close();
    setSearchResetKey(prev => prev + 1);
  };
  const handlePresentModal = () => bottomSheetRef.current?.expand();

  const nothingToShow = (
    hasData: boolean,
    message: string = 'Nothing To Show',
    icon: string,
  ) => (
    <View style={styles.emptyContainer}>
      {!hasData && (
        <>
          <Material name={icon} size={64} color={theme.colors.secondaryIcon} />
          <Text style={styles.emptyTextStyle}>{message}</Text>
        </>
      )}
    </View>
  );

  // ✅ Load all data initially
  const loadAllData = async () => {
    try {
      setLoading(true);
      setRefreshing(true);

      const [friendsData, requestsData, usersData] = await Promise.all([
        fetchFriends(),
        allRequests(),
        fetchUsers(),
      ]);

      setFriends(friendsData);
      setFilteredFriends(friendsData);

      setRequests(requestsData);
      setFilteredRequests(requestsData);

      setUsers(usersData);
      setFilteredUsers([]); // empty until search
    } catch (error) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        iconColor: '#DC3545',
        title: 'Something Went Wrong,',
        description: 'Failed to load data. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => loadAllData(),
      });
    } finally {
      setRefreshing(false);
      setTimeout(() => {
        setLoading(false); // stop search loader
      }, 500);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (selectedTab === 'friends') {
        const friendsData = await fetchFriends();
        setFriends(friendsData);
        setFilteredFriends(friendsData);
      } else {
        const requestsData = await allRequests();
        setRequests(requestsData);
        setFilteredRequests(requestsData);
      }
    } catch (error) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        iconColor: '#DC3545',
        title: 'Something Went Wrong,',
        description: 'Could not refresh data.',
        buttonRow: false,
      });
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ Accept friend
  const handleAddFriend = async (requestId: string) => {
    try {
      const addedFriend = await acceptFriendRequest(requestId);
      setFriends(prev =>
        prev.some(f => f._id === addedFriend._id)
          ? prev
          : [...prev, addedFriend],
      );
      setFilteredFriends(prev =>
        prev.some(f => f._id === addedFriend._id)
          ? prev
          : [...prev, addedFriend],
      );

      setRequests(prev => prev.filter(r => r._id !== requestId));
      setFilteredRequests(prev => prev.filter(r => r._id !== requestId));
      showModal({
        title: 'All Set',
        description: 'Friend added successfully 🎉',
        iconName: 'checkbox-marked-circle-outline',
        iconColor: '#28A745',
        buttonRow: false,
      });
    } catch (error: any) {
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
    } catch (error: any) {
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

  const handleRejectRequest = async (requestID: string) => {
    try {
      const data = await rejectFriendRequest(requestID);
      setRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        iconColor: '#DC3545',
        title: 'Something Went Wrong,',
        description: 'Could not reject request.',
        buttonRow: false,
      });
    }
  };

  const handleFriendRequestSend = async (email: string) => {
    try {
      setSearchLoading(true); // start search loader
      const data = await sendFriendRequest(email);
      showModal({
        title: 'All Set',
        description: `Request Sent successfully 🎉`,
        iconName: 'checkbox-marked-circle-outline',
        iconColor: '#28A745',
        buttonRow: false,
      });
      setUsers(prev =>
        prev.map(u => (u.email === email ? { ...u, status: 'sent' } : u)),
      );
      bottomSheetRef?.current?.close();
      setRequests(data);
    } catch (error) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        iconColor: '#DC3545',
        title: 'Something Went Wrong,',
        description: 'Could not send request.',
        buttonRow: false,
      });
    } finally {
      setTimeout(() => {
        setSearchLoading(false); // stop search loader
      }, 300);
    }
  };

  const handleSearchUsers = async (text: string) => {
    setSearchText(text);
    if (!text.trim()) {
      setFilteredUsers([]);
      return;
    }

    setSearchLoading(true);
    try {
      const results = users.filter(
        user =>
          (user?.firstName?.includes(text) ||
            user?.lastName?.includes(text) ||
            user?.email?.includes(text)) ??
          false,
      );
      setFilteredUsers(results);
    } finally {
      setTimeout(() => {
        setSearchLoading(false); // stop search loader
      }, 300);
    }
  };

  const handleSearch = (text: string) => {
    if (!text.trim()) {
      setFilteredFriends(friends);
      setFilteredRequests(requests);
      return;
    }

    const friendResults = friends.filter(
      f => f.firstName.includes(text) || f.lastName.includes(text),
    );
    const requestResults = requests.filter(
      r => r.firstName.includes(text) || r.lastName.includes(text),
    );

    setFilteredFriends(friendResults);
    setFilteredRequests(requestResults);
  };

  const usersWithStatus = filteredUsers.map(u => ({
    ...u,
    isFriend: friends.some(f => f._id === u._id),
  }));

  useEffect(() => {
    loadAllData();
  }, []);

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
                  color: theme.colors.subtitleTextColor,
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

        {/* Tab Content */}
        <View style={{ flex: 1 }}>
          {loading || refreshing ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator
                size="large"
                color={theme.colors.primaryIcon}
              />
            </View>
          ) : selectedTab === 'friends' ? (
            filteredFriends.length === 0 ? (
              nothingToShow(false, 'Connect to Continue', 'person-add-alt')
            ) : (
              <FlatList
                data={filteredFriends.sort((a, b) =>
                  (a.firstName + ' ' + a.lastName).localeCompare(
                    b.firstName + ' ' + b.lastName,
                  ),
                )}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                contentContainerStyle={styles.flatlistContainer}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
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
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => (
                <FriendsCard
                  title="Accept"
                  buttonRow
                  item={{ ...item, isFriend: false }}
                  onPrimaryPress={() => handleAddFriend(item._id)}
                  onSecondaryPress={() => handleRejectRequest(item._id)}
                />
              )}
            />
          )}
        </View>
      </View>

      {/* Bottom Sheet */}
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

          {searchLoading ? (
            <ActivityIndicator
              size="large"
              color={theme.colors.primaryIcon}
              style={{ marginTop: 20 }}
            />
          ) : searchText.trim() === '' ? (
            // Initial state before searching
            nothingToShow(false, 'Connect to Continue', 'person-add-alt')
          ) : filteredUsers.length === 0 ? (
            // No results found
            nothingToShow(false, 'No users found', 'no-accounts')
          ) : (
            <>
              <Text style={styles.subtitle}>
                Search Results ({usersWithStatus.length})
              </Text>
              <FlatList
                data={usersWithStatus.sort((a, b) =>
                  (a.firstName + ' ' + a.lastName).localeCompare(
                    b.firstName + ' ' + b.lastName,
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
          )}
        </View>
      </CustomBottomSheet>
    </>
  );
};

export default FriendsScreen;
