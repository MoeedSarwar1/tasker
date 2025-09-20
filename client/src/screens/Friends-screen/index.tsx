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
import { useFriendsContext } from '../../context/Friends-context';
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

  const [filteredFriends, setFilteredFriends] = useState<any[]>([]);
  const { requests, setRequests, friends, setFriends, friendsUpdated } =
    useFriendsContext();
  const [filteredRequests, setFilteredRequests] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const EmptyState = ({
    message,
    icon,
    description,
  }: {
    message: string;
    icon: string;
    description?: string;
  }) => (
    <View style={styles.emptyContainer}>
      <Material name={icon} size={48} color={theme.colors.primaryIcon} />
      <Text style={styles.emptyTitle}>{message}</Text>
      {description && (
        <Text style={styles.emptyDescription}>{description}</Text>
      )}
    </View>
  );

  // Load all data initially
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
      setFilteredUsers([]);
    } catch (error) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        title: 'Connection Error',
        description: 'Failed to load data. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => loadAllData(),
      });
    } finally {
      setRefreshing(false);
      setLoading(false);
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
        title: 'Refresh Failed',
        description: 'Could not refresh data.',
        buttonRow: false,
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddFriend = async (requestId: string) => {
    try {
      showModal({
        mode: 'loading',
        title: 'Adding Friend...',
        description: 'Accepting friend request',
        iconName: 'account-plus-outline',
        buttonRow: false,
      });

      const addedFriend = await acceptFriendRequest(requestId);
      const userName =
        addedFriend.friend.firstName + ' ' + addedFriend.friend.lastName;

      setFriends(prev =>
        prev.some(f => f._id === addedFriend._id)
          ? prev
          : [...prev, addedFriend.friend],
      );
      setFilteredFriends(prev =>
        prev.some(f => f._id === addedFriend._id)
          ? prev
          : [...prev, addedFriend.friend],
      );

      setFilteredRequests(prev => prev.filter(r => r._id !== requestId));

      setTimeout(() => {
        handleHideModal();
        setTimeout(() => {
          showModal({
            mode: 'success',
            title: 'Friend Added',
            description: `${userName} is now in your network`,
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
            'Failed to accept friend request.',
          buttonRow: false,
        });
      }, 100);
    }
  };

  const handleRemoveFriend = async (firstName: string, lastName: string) => {
    try {
      const response = await removeFriend(firstName, lastName);
      const removedFriendId = response.friend._id || response.friend.id;

      setFriends(prev => prev.filter(f => f._id !== removedFriendId));
      setFilteredFriends(prev => prev.filter(f => f._id !== removedFriendId));

      showModal({
        mode: 'success',
        title: 'Friend Removed',
        description: `${firstName} ${lastName} removed from network`,
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
      showModal({
        mode: 'loading',
        title: 'Declining Request',
        description: 'Please wait...',
        iconName: 'account-clock-outline',
      });

      await rejectFriendRequest(requestID);
      handleHideModal();
      setFilteredRequests(prev => prev.filter(r => r._id !== requestID));

      showModal({
        title: 'Request Declined',
        mode: 'success',
        description: 'Friend request declined',
        iconName: 'account-minus-outline',
        buttonRow: false,
      });
    } catch (error: any) {
      handleHideModal();
      showModal({
        mode: 'error',
        iconName: 'account-cancel-outline',
        title: 'Could Not Decline Request',
        description:
          error?.response?.data?.message || 'Failed to decline request.',
        buttonRow: false,
      });
    }
  };

  const handleFriendRequestSend = async (email: string) => {
    try {
      showModal({
        mode: 'loading',
        title: 'Sending Request',
        description: 'Please wait...',
        iconName: 'account-arrow-right-outline',
        buttonRow: false,
      });

      await sendFriendRequest(email);
      handleHideModal();

      setUsers(prev =>
        prev.map(u => (u.email === email ? { ...u, status: 'sent' } : u)),
      );

      bottomSheetRef?.current?.close();

      showModal({
        title: 'Request Sent',
        description: 'Friend request sent successfully',
        iconName: 'account-check-outline',
        buttonRow: false,
        mode: 'success',
      });
    } catch (error: any) {
      handleHideModal();
      showModal({
        mode: 'error',
        iconName: 'account-alert-outline',
        title: 'Could Not Send Request',
        description:
          error?.response?.data?.message || 'Failed to send request.',
        buttonRow: false,
      });
    } finally {
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
        setSearchLoading(false);
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
    setFilteredRequests(requests);
  }, [requests]);

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <>
      <Header title="Network" />

      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            onSearch={handleSearch}
            placeholder={
              selectedTab === 'friends'
                ? 'Find people in your network'
                : 'Search requests'
            }
          />
        </View>

        {/* Simple Tab Selector */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, selectedTab === 'friends' && styles.activeTab]}
            onPress={() => setSelectedTab('friends')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'friends' && styles.activeTabText,
              ]}
            >
              Co-workers ({filteredFriends.length})
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tab, selectedTab === 'requests' && styles.activeTab]}
            onPress={() => setSelectedTab('requests')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'requests' && styles.activeTabText,
              ]}
            >
              Requests ({requests.length})
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="large"
                color={theme.colors.primaryIcon}
              />
            </View>
          ) : selectedTab === 'friends' ? (
            filteredFriends.length === 0 ? (
              <EmptyState
                message="No Co-workers"
                icon="people-outline"
                description="Add co-workers to start collaborating"
              />
            ) : (
              <FlatList
                data={filteredFriends.sort((a, b) =>
                  (a.firstName + ' ' + a.lastName).localeCompare(
                    b.firstName + ' ' + b.lastName,
                  ),
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
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
            <EmptyState
              message="No Pending Requests"
              icon="inbox"
              description="Friend requests will appear here"
            />
          ) : (
            <FlatList
              data={filteredRequests}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
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

        {/* Simple Add Button */}
        <Pressable style={styles.addButton} onPress={handlePresentModal}>
          <Material name="add" size={24} color={theme.colors.primaryIcon} />
        </Pressable>
      </View>

      {/* Bottom Sheet */}
      <CustomBottomSheet
        ref={bottomSheetRef}
        onClose={handleHideModal}
        snapPoints={snapPoints}
        title="Add Co-workers"
      >
        <View style={styles.bottomSheetContent}>
          <Searchbar
            onSearch={handleSearchUsers}
            clearTrigger={searchResetKey}
            placeholder="Search by name or email"
          />

          {searchLoading ? (
            <View style={styles.searchLoadingContainer}>
              <ActivityIndicator
                size="large"
                color={theme.colors.primaryIcon}
              />
            </View>
          ) : searchText.trim() === '' ? (
            <EmptyState
              message="Search for Co-workers"
              icon="search"
              description="Enter name or email to find people"
            />
          ) : filteredUsers.length === 0 ? (
            <EmptyState
              message="No Results"
              icon="search-off"
              description="No users found matching your search"
            />
          ) : (
            <FlatList
              data={usersWithStatus.sort((a, b) =>
                (a.firstName + ' ' + a.lastName).localeCompare(
                  b.firstName + ' ' + b.lastName,
                ),
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.searchListContainer}
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
          )}
        </View>
      </CustomBottomSheet>
    </>
  );
};

export default FriendsScreen;
