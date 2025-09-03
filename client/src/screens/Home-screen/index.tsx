import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Platform, RefreshControl, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AddTask from '../../Components/AddTask/AddTask';
import Header from '../../Components/Header/Header';
import TaskCard from '../../Components/TaskCard/TaskCard';
import { useAuth } from '../../context/Auth-context';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [refreshing, setRefreshing] = useState(false);
  const snapPoints = useMemo(() => ['50%'], []);
  const { user } = useAuth();

  const handlePresentModal = () => {
    bottomSheetRef.current?.expand();
  };

  const handleHideModal = () => {
    bottomSheetRef.current?.close();
  };

  //create a funtion that greets based on time of day
  const getGreeting = (): string => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 15) {
      return 'Good Noon';
    } else if (currentHour >= 15 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <>
      <Header
        title={`${getGreeting()} ${user?.firstName}`}
        subtitle={`You have ${tasks.length} tasks today`}
        onPressAdd={() => handlePresentModal()}
      />
      <View
        style={{ paddingHorizontal: 24, flex: 1, backgroundColor: '#F9fafb' }}
      >
        {tasks.length === 0 ? (
          <TaskCard
            loadingCard
            item={{
              title: 'No Tasks Available',
              description: 'Please add some tasks.',
            }}
          />
        ) : (
          <FlatList
            data={tasks}
            style={{ marginTop: 24 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={({ item }) => (
              <TaskCard
                item={item}
                // onDelete={deleteTask}
                // onChange={updateTaskStatus}
              />
            )}
          />
        )}
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onClose={handleHideModal}
        enablePanDownToClose
        keyboardBehavior="interactive" // 👈 important
        keyboardBlurBehavior="restore"
      >
        <BottomSheetView>
          <AddTask onCancle={handleHideModal} />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default HomeScreen;
