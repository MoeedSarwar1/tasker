import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddTask from '../../Components/AddTask/AddTask';
import Header from '../../Components/Header/Header';
import TaskCard from '../../Components/TaskCard/TaskCard';
import {
  deleteTask,
  fetchTasks,
  postTask,
  updateTask,
} from '../../network/Tasks';
import homeStles from './styles';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const moreRef = React.useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['59%'], []);
  const moreSnapPoints = useMemo(() => ['27%'], []);
  const styles = homeStles();
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const openMore = () => moreRef.current?.expand();

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
    priority: 'Low priority' | 'Medium priority' | 'High priority';
  }) => {
    try {
      const newTask = await postTask(task);

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

  const handleDeleteTask = async (taskId: string) => {
    try {
      const deletedTask = await deleteTask(taskId);
      Alert.alert('Success', 'Task deleted successfully!');
      await loadTasks();
      moreRef.current?.close();

      return deletedTask;
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to delete task',
      );
    }
  };

  const updateTaskStatus = async (taskId: string, completed: boolean) => {
    try {
      const updatedTask = await updateTask(taskId, completed);
      Alert.alert('Success', 'Task status updated successfully!');
      return updatedTask;
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to update task status',
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

  const handleToggleTaskCompletion = async (taskId: string) => {
    try {
      // Update UI instantly
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t._id === taskId ? { ...t, completed: !t.completed } : t,
        ),
      );

      // Find the new completion status from state
      const task = tasks.find(t => t._id === taskId);
      const newStatus = task ? !task.completed : true;

      // Call backend
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error('Error toggling task completion:', error);
      Alert.alert('Error', 'Failed to update task status');

      // Optionally revert UI if API fails
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t._id === taskId ? { ...t, completed: !t.completed } : t,
        ),
      );
    }
  };
  return (
    <>
      <Header
        title={getGreeting()}
        subtitle={`You have ${tasks.length} tasks today`}
        onPressAdd={handlePresentModal}
      />

      <View style={{ flex: 1, backgroundColor: '#F9fafb' }}>
        {tasks.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <Icon name="notebook-edit-outline" size={64} color="#7f7f7f" />

            <Text style={{ color: '#7f7f7f', fontSize: 16 }}>
              Looks like you’re all caught up!
            </Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            showsVerticalScrollIndicator
            style={{ paddingTop: 24 }}
            contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={({ item }) => (
              <TaskCard
                item={item}
                onChange={() => handleToggleTaskCompletion(item._id)}
                onMorePress={() => {
                  setSelectedTask(item); // save which task we want to act on
                  openMore(); // open the "More" bottom sheet
                }}
              />
            )}
          />
        )}
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={backdropProps => (
          <BottomSheetBackdrop
            {...backdropProps}
            appearsOnIndex={0} // show when index >= 0
            disappearsOnIndex={-1} // hide when sheet is closed
            pressBehavior="collapse"
            opacity={0.5}
          />
        )}
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
      <BottomSheet
        ref={moreRef}
        index={-1}
        snapPoints={moreSnapPoints}
        onClose={handleHideModal}
        enablePanDownToClose
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        backdropComponent={backdropProps => (
          <BottomSheetBackdrop
            {...backdropProps}
            appearsOnIndex={0} // show when index >= 0
            disappearsOnIndex={-1} // hide when sheet is closed
            pressBehavior="collapse"
            opacity={0.5}
          />
        )}
        style={{ backgroundColor: '#F9fafb', borderRadius: 16 }}
      >
        <BottomSheetView style={styles.parentView}>
          <Pressable
            onPress={() => handleDeleteTask(selectedTask._id)}
            style={styles.childrenWrapperStyle}
          >
            <Text
              style={{ color: '#F9fafb', fontWeight: 'bold', fontSize: 16 }}
            >
              Delete
            </Text>
            <Icon name="delete-outline" size={20} color="#F9fafb" />
          </Pressable>
          <View style={styles.editColor}>
            <Text
              style={{ fontWeight: 'semibold', fontSize: 16, color: '#111827' }}
            >
              Edit
            </Text>
            <Pressable hitSlop={10}>
              <Icon name="square-edit-outline" size={20} color="#111827" />
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default HomeScreen;
