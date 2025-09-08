import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import CustomBottomSheet from '../../Components/BottomSheet';
import FriendsCard from '../../Components/FriendsCard';
import Header from '../../Components/Header/Header';
import Searchbar from '../../Components/SearchBar';
import Text from '../../Components/Text';
import { useModal } from '../../context/Modal-context';
import { fetchFriends } from '../../network/Friends';
import friendsStyles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FriendsScreen = () => {
  const snapPoints = useMemo(() => ['50%'], []);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [friends, setFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { showModal } = useModal();

  const handlePresentModal = () => bottomSheetRef.current?.expand();
  const handleHideModal = () => {
    bottomSheetRef.current?.close();
  };
  const insets = useSafeAreaInsets();
  const styles = friendsStyles(insets);

  const loadTasks = async () => {
    try {
      setRefreshing(true);
      const data = await fetchFriends();

      setFriends(data);
    } catch (error) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        iconColor: '#DC3545',
        title: 'Something Went Wrong,',
        description: 'Tasks didn’t load. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => onRefresh(),
      });
    } finally {
      setRefreshing(false);
    }
  };
  const onRefresh = async () => {
    await loadTasks();
  };

  // Fetch tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <Header title="Friends" showAdd onPressAdd={() => handlePresentModal()} />

      <View style={styles.container}>
        <Searchbar />
        <Text style={styles.subtitle}>All Friends ({friends.length})</Text>
        <View>
          <FlatList
            data={friends} // ✅ only filtered tasks shown
            showsVerticalScrollIndicator
            style={styles.list}
            contentContainerStyle={styles.flatlistContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({ item }) => <FriendsCard item={item} />}
          />
        </View>
      </View>

      <CustomBottomSheet
        ref={bottomSheetRef}
        onClose={handleHideModal}
        snapPoints={snapPoints}
        title="Add Friends"
      >
        <View style={styles.top}>
          <Searchbar />
        </View>
      </CustomBottomSheet>
    </>
  );
};

export default FriendsScreen;
