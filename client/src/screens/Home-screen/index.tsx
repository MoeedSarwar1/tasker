import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddTask from '../../Components/AddTask/AddTask';
import Header from '../../Components/Header/Header';
import { Task } from '../../Components/TaskCard/task.interface';
import TaskCard from '../../Components/TaskCard/TaskCard';
import Text from '../../Components/Text';
import { useModal } from '../../context/Modal-context';
import {
  deleteTask,
  fetchTasks,
  postTask,
  updateTask,
  updateTaskCompletion,
} from '../../network/Tasks';
import homeStles from './styles';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [tasks, setTasks] = useState([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const moreRef = React.useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => (isKeyboardVisible ? ['75%'] : ['55%']),
    [isKeyboardVisible],
  );
  const moreSnapPoints = useMemo(() => ['25%'], []);
  const styles = homeStles(insets);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { showModal } = useModal();
  const openMore = (task: Task) => {
    setSelectedTask(task);
    moreRef.current?.expand();
  };

  const closeMore = () => {
    setSelectedTask(null);
    moreRef.current?.close();
  };

  // Open BottomSheet
  const handlePresentModal = () => bottomSheetRef.current?.expand();

  // Close BottomSheet
  const handleHideModal = () => {
    bottomSheetRef.current?.close();
  };

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

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardVisible(true),
    );
    const hideListener = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardVisible(false),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);
  // Add new task
  const handleAddTask = async (task: {
    title: string;
    description: string;
    priority: 'Low priority' | 'Medium priority' | 'High priority';
    dueDate: Date | string;
  }) => {
    try {
      const newTask = await postTask(task);

      // Update local tasks
      setTasks(prevTasks => [newTask, ...prevTasks]);
      showModal({
        title: 'Success',
        description: 'Task Successfully Added',
        iconName: 'checkbox-marked-circle-outline',
        iconColor: '#28A745',
        onConfirm: () => setEditMode(false),
        buttonRow: false,
      });
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
      await loadTasks();
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
      const updatedTask = await updateTaskCompletion(taskId, completed);
      showModal({
        title: 'Success',
        description: 'Marked complete successfully',
        iconName: 'checkbox-marked-circle-outline',
        iconColor: '#28A745',
        onConfirm: () => setEditMode(false),
        buttonRow: false,
      });
      return updatedTask;
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to update task status',
      );
    }
  };

  const handleUpdateTask = async (taskId: string, task: Task) => {
    try {
      const updatedTask = await updateTask(taskId, task);

      setTasks(
        prev => prev.map(t => (t._id === taskId ? updatedTask : t)), // ✅ replace with updatedTask
      );

      showModal({
        title: 'Success',
        description: 'Task Successfully Updated',
        iconName: 'checkbox-marked-circle-outline',
        iconColor: '#28A745',
        onConfirm: () => setEditMode(false),
        buttonRow: false,
      });
      return updatedTask;
    } catch (error: any) {
      console.error('Update Task Error:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to update task',
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

      <View style={styles.container}>
        {tasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="notebook-edit-outline" size={64} color="#7f7f7f" />

            <Text style={styles.emptyTextStyle}>
              Looks like you’re all caught up!
            </Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            showsVerticalScrollIndicator
            style={styles.list}
            contentContainerStyle={styles.flatlistContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({ item }) => (
              <TaskCard
                item={item}
                onChange={() => handleToggleTaskCompletion(item._id)}
                onMorePress={() => {
                  setSelectedTask(item); // save which task we want to act on
                  openMore(item); // open the "More" bottom sheet
                }}
              />
            )}
          />
        )}
      </View>

      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          backdropComponent={backdropProps => (
            <BottomSheetBackdrop
              {...backdropProps}
              appearsOnIndex={0} // show when index >= 0
              disappearsOnIndex={-1} // hide when sheet is closed
              pressBehavior="close"
              opacity={0.5}
            />
          )}
          index={-1}
          onClose={handleHideModal}
          snapPoints={snapPoints}
          enablePanDownToClose
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
        >
          <BottomSheetView style={styles.formView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
              <AddTask onCancel={handleHideModal} onSubmit={handleAddTask} />
            </KeyboardAvoidingView>
          </BottomSheetView>
        </BottomSheet>
      </Portal>

      <Portal>
        <BottomSheet
          ref={moreRef}
          index={-1}
          onClose={handleHideModal}
          snapPoints={moreSnapPoints}
          enableDynamicSizing
          enablePanDownToClose
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          backdropComponent={backdropProps => (
            <BottomSheetBackdrop
              {...backdropProps}
              appearsOnIndex={0} // show when index >= 0
              disappearsOnIndex={-1} // hide when sheet is closed
              pressBehavior="close"
              opacity={0.5}
            />
          )}
          style={styles.bottomshhetContainer}
        >
          <BottomSheetView style={styles.formView}>
            {!editMode ? (
              <View style={styles.parentView}>
                <Pressable
                  onPress={() => {
                    closeMore();
                    showModal({
                      title: 'Delete Task',
                      description: 'Are you sure you want to delete this task?',
                      iconName: 'delete-outline',
                      onConfirm: () => {
                        handleDeleteTask(selectedTask?._id);
                        closeMore();
                      },
                    });
                  }}
                  style={styles.childrenWrapperStyle}
                >
                  <Text style={styles.text}>Delete</Text>
                  <Icon name="delete-outline" size={20} color="#F9fafb" />
                </Pressable>

                <Pressable
                  style={styles.editColor}
                  onPress={() => setEditMode(true)}
                >
                  <Text style={styles.text}>Edit</Text>
                  <Pressable hitSlop={10}>
                    <Icon
                      name="square-edit-outline"
                      size={20}
                      color="#F9fafb"
                    />
                  </Pressable>
                </Pressable>
              </View>
            ) : (
              <AddTask
                mode="edit" // ✅ tell AddTask this is editing
                initialTask={selectedTask} // ✅ pass the task directly
                onSubmit={updatedTask => {
                  if (selectedTask?._id) {
                    handleUpdateTask(selectedTask._id, updatedTask); // ✅ no `.item`
                  }
                  closeMore();
                }}
                onCancel={() => setEditMode(false)}
              />
            )}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>
  );
};

export default HomeScreen;
