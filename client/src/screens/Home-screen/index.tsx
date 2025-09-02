import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Platform, RefreshControl, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AddTask from '../../Components/AddTask/AddTask';
import Header from '../../Components/Header/Header';
import TaskCard from '../../Components/TaskCard/TaskCard';
import useApi from '../../network/useApi';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const { deleteData, updateStatus, postData, fetchData } = useApi();
  const [refreshing, setRefreshing] = useState(false);
  const snapPoints = useMemo(() => ['50%'], []);

  const handlePresentModal = () => {
    bottomSheetRef.current?.expand();
  };

  const handleHideModal = () => {
    bottomSheetRef.current?.close();
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const data = await fetchData('/tasks');
    setTasks(data);
    setRefreshing(false);
  }, [fetchData]);

  const refreshTasks = async () => {
    try {
      const data = await fetchData('/tasks');
      setTasks(data);
    } catch (error) {
      console.error('Error refreshing tasks:', error);
    }
  };

  const postTask = async (task: { title: string; description: string }) => {
    try {
      await postData('/tasks', task);
      setTasks(prevTasks => [
        ...prevTasks,
        { ...task, id: Date.now().toString() },
      ]);
      await refreshTasks(); // ✅ fetch latest from server
      Alert.alert('Task Added Successfully');
      bottomSheetRef.current?.close();
    } catch (error) {
      console.error('Error posting task:', error);
    }
  };

  useEffect(() => {
    Platform.OS === 'android' && SplashScreen.hide();

    const getAllWorkOuts = async () => {
      try {
        const data = await fetchData('/tasks');

        console.log('Response:', data);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    getAllWorkOuts();
  }, []);

  const deleteTask = async (id: string) => {
    try {
      await deleteData('/tasks', id);
      await refreshTasks(); // ✅ fetch latest from server
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
    }
  };

  const updateTaskStatus = async (id: string, completed: boolean) => {
    try {
      await updateStatus('/tasks', id, completed);
      await refreshTasks(); // ✅ fetch latest from server
    } catch (error) {
      console.error('Error updating task status:', error);
    }
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
        title={getGreeting()}
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
                onDelete={deleteTask}
                onChange={updateTaskStatus}
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
          <AddTask onCancle={handleHideModal} onSubmit={postTask} />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default HomeScreen;
