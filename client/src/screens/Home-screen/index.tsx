import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import AddTask from '../../Components/AddTask/AddTask';
import Header from '../../Components/Header/Header';
import TaskCard from '../../Components/TaskCard/TaskCard';
import { useAuth } from '../../context/Auth-context';
import client from '../../network/Client';
import { API_ENDPOINTS } from '../../network/Endpoints';
import { fetchTasks } from '../../network/Tasks';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const { user } = useAuth();

  // Open BottomSheet
  const handlePresentModal = () => bottomSheetRef.current?.expand();

  // Close BottomSheet
  const handleHideModal = () => bottomSheetRef.current?.close();

  // Fetch tasks from backend
  const loadTasks = async () => {
    try {
      setRefreshing(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Fetch Tasks Error:', error);
      Alert.alert('Error', 'Failed to load tasks');
    } finally {
      setRefreshing(false);
    }
  };

  // Add new task
  const handleAddTask = async (task: {
    title: string;
    description: string;
  }) => {
    try {
      const response = await client.post(API_ENDPOINTS.POST_TASK, task);
      const newTask = response.data;

      // Update local tasks
      setTasks(prevTasks => [newTask, ...prevTasks]);
      Alert.alert('Success', 'Task added successfully!');
      handleHideModal();
    } catch (error: any) {
      console.error('Add Task Error:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to add task',
      );
    }
  };

  // Pull-to-refresh
  const onRefresh = async () => {
    await loadTasks();
  };

  // Fetch tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Greeting based on time
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 15) return 'Good Noon';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <>
      <Header
        title={`${getGreeting()} ${user?.firstName || ''}`}
        subtitle={`You have ${tasks.length} tasks today`}
        onPressAdd={handlePresentModal}
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
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({ item }) => <TaskCard item={item} />}
          />
        )}
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onClose={handleHideModal}
        enablePanDownToClose
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        <BottomSheetView>
          <AddTask onCancle={handleHideModal} onSubmit={handleAddTask} />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default HomeScreen;
