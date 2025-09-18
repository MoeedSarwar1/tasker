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
import Searchbar from '../../Components/SearchBar';
import LinearGradient from 'react-native-linear-gradient';

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
          <Material name={icon} size={52} color={theme.colors.secondaryIcon} />
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
        title: 'Something Went Wrong,',
        description: 'Failed to load data. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => loadAllData(),
      });
    } finally {
      setRefreshing(false);
      setLoading(false); // stop search loader
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
      // Show loading modal
      showModal({
        mode: 'loading',
        title: 'Adding Friend...',
        description: 'Accepting friend request',
        iconName: 'account-plus-outline',
        buttonRow: false,
      });

      const addedFriend = await acceptFriendRequest(requestId);

      // Update local state
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

      // Brief delay to show success state
      setTimeout(() => {
        handleHideModal();

        // Show success modal after a short delay
        setTimeout(() => {
          showModal({
            mode: 'success',
            title: 'Welcome to Your Network! 🤝',
            description: `${addedFriend.firstName} is now your friend and can share tasks with you`,
            iconName: 'account-heart-outline',
            buttonRow: false,
          });
        }, 100);
      }, 600);
    } catch (error: any) {
      handleHideModal();

      setTimeout(() => {
        showModal({
          mode: 'error',
          iconName: 'account-remove-outline',
          title: 'Unable to Add Friend',
          description:
            error?.response?.data?.message ||
            'Failed to accept friend request. Please check your connection and try again.',
          buttonRow: false,
        });
      }, 100);
    }
  };

  const handleRemoveFriend = async (firstName: string, lastName: string) => {
    try {
      const removedFriend = await removeFriend(firstName, lastName);

      setFriends(prev => prev.filter(f => f._id !== removedFriend));
      setFilteredFriends(prev => prev.filter(f => f._id !== removedFriend));

      showModal({
        mode: 'success',
        title: 'All Set',
        description: `${firstName} ${lastName} Removed successfully 🎉`,
        iconName: 'checkbox-marked-circle-outline',
        buttonRow: false,
      });

      handleHideModal();
    } catch (error: any) {
      showModal({
        mode: 'error',
        iconName: 'account-cancel-outline',
        title: 'Could not remove friend',
        description: error?.response?.data?.message || 'User not found',
        buttonRow: false,
      });
    }
  };

  const handleRejectRequest = async (requestID: string) => {
    try {
      // Show loading modal
      showModal({
        mode: 'loading',
        title: 'Processing Request',
        description: 'Please wait while we decline the friend request...',
        iconName: 'account-clock-outline',
      });

      const data = await rejectFriendRequest(requestID);

      // Hide loading modal first
      handleHideModal();

      // Update local state
      setRequests(data);
      setFilteredRequests(data);

      // Show success modal
      showModal({
        title: 'Request Declined',
        mode: 'success',
        description: 'The friend request has been declined',
        iconName: 'account-minus-outline',
        buttonRow: false,
      });
    } catch (error: any) {
      // Hide loading modal first
      handleHideModal();

      // Show error modal
      showModal({
        mode: 'error',
        iconName: 'account-cancel-outline',
        title: 'Could Not Decline Request',
        description:
          error?.response?.data?.message ||
          'Failed to decline friend request. Please try again.',
        buttonRow: false,
      });
    }
  };

  const handleFriendRequestSend = async (email: string) => {
    try {
      // Show loading modal
      showModal({
        mode: 'loading',
        title: 'Sending Request',
        description: 'Please wait while we send your friend request...',
        iconName: 'account-arrow-right-outline',
        buttonRow: false,
      });

      const data = await sendFriendRequest(email);

      // Hide loading modal first
      handleHideModal();

      // Update local state
      setUsers(prev =>
        prev.map(u => (u.email === email ? { ...u, status: 'sent' } : u)),
      );
      setRequests(data);

      // Close bottom sheet
      bottomSheetRef?.current?.close();

      // Show success modal
      showModal({
        title: 'Request Sent! 📤',
        description: 'Your friend request has been sent successfully',
        iconName: 'account-check-outline',
        buttonRow: false,
        mode: 'success',
      });
    } catch (error: any) {
      // Hide loading modal first
      handleHideModal();

      // Show error modal
      showModal({
        mode: 'error',
        iconName: 'account-alert-outline',
        title: 'Could Not Send Request',
        description:
          error?.response?.data?.message ||
          'Failed to send friend request. Please try again.',
        buttonRow: false,
      });
    } finally {
      // Clean up any loading states
      setTimeout(() => {
        setSearchLoading(false);
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
      <Header title="Co-workers" />

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
        <LinearGradient
          colors={theme.colors.floatingButton}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.logoutContainer}
        >
          <Pressable
            onPress={() => {
              handlePresentModal();
            }}
            style={styles.content}
          >
            <Material name="add" size={28} color="white" />
          </Pressable>
        </LinearGradient>
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
