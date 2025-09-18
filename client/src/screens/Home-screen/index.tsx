import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  RefreshControl,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddTask from '../../Components/AddTask/AddTask';
import CustomBottomSheet from '../../Components/BottomSheet';
import Header from '../../Components/Header/Header';
import { Task } from '../../Components/TaskCard/task.interface';
import TaskCard from '../../Components/TaskCard/TaskCard';
import Text from '../../Components/Text';
import { useModal } from '../../context/Modal-context';
import { useTheme } from '../../context/Theme-context';
import { fetchFriends, getFriendTasks } from '../../network/Friends';
import {
  deleteTask,
  fetchTasks,
  postTask,
  updateTask,
  updateTaskCompletion,
} from '../../network/Tasks';
import homeStles from './styles';
import { useFriendsContext } from '../../context/Friends-context';

const HomeScreen = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [tasks, setTasks] = useState([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const moreRef = React.useRef<BottomSheet>(null);
  const [filter, setFilter] = useState('all'); // all | pending | completed
  const snapPoints = useMemo(
    () => (isKeyboardVisible ? ['65%'] : ['55%']),
    [isKeyboardVisible],
  );
  const moreSnapPoints = useMemo(() => ['25%'], []);
  const styles = homeStles(insets, theme);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { friendsUpdated } = useFriendsContext();

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

  useEffect(() => {
    if (!loading) {
      loadTasks(); // reload tasks when a friend is added/removed
    }
  }, [friendsUpdated]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);
  // Close BottomSheet
  const handleHideModal = () => {
    setEditMode(false);
    bottomSheetRef.current?.close();
  };
  // Fetch tasks from backend
  const loadTasks = async () => {
    try {
      setRefreshing(true);

      const myTasks = await fetchTasks(); // logged-in user
      const friends = await fetchFriends();

      const friendsTasks = await Promise.all(
        friends.map(friend => getFriendTasks(friend._id)),
      );

      setTasks([...myTasks, ...friendsTasks.flat()]);

      // Merge them
    } catch (error) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        title: 'Something Went Wrong,',
        description: 'Tasks didn’t load. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => onRefresh(),
      });
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
      // Show loading modal
      showModal({
        mode: 'loading',
        iconName: 'clock-outline',
        title: 'Adding Task',
        description: 'Please wait while we save your task...',
      });

      const newTask = await postTask(task);

      // Hide loading modal first
      handleHideModal();

      // Update local tasks
      setTasks(prevTasks => [newTask, ...prevTasks]);

      // Show success modal
      showModal({
        title: 'All Set!',
        description: 'Task added successfully',
        iconName: 'checkbox-marked-circle-outline',
        mode: 'success',
        onConfirm: () => setEditMode(false),
        buttonRow: false,
      });
    } catch (error: any) {
      // Hide loading modal first
      handleHideModal();

      // Show error modal
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        title: 'Something Went Wrong',
        description: 'Failed to add task. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => onRefresh(),
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const deletedTask = await deleteTask(taskId);
      showModal({
        title: 'All Set',
        description: 'Removed Successfully',
        iconName: 'checkbox-marked-circle-outline',
        buttonRow: false,
        mode: 'success',
      });
      await loadTasks();
      return deletedTask;
    } catch (error: any) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        title: 'Something Went Wrong,',
        description: 'Failed to delete task. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => onRefresh(),
      });
    }
  };

  const updateTaskStatus = async (taskId: string, completed: boolean) => {
    try {
      const updatedTask = await updateTaskCompletion(taskId, completed);

      showModal({
        title: completed ? 'All Set' : 'Task Updated',
        description: completed
          ? 'Task marked as completed successfully.'
          : 'Task marked as incomplete successfully.',
        iconName: completed
          ? 'checkbox-marked-circle-outline'
          : 'checkbox-blank-circle-outline',
        iconColor: completed ? '#28A745' : '#FFC107', // green for done, yellow for undo
        onConfirm: () => setEditMode(false),
        buttonRow: false,
      });

      return updatedTask;
    } catch (error: any) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        title: 'Something Went Wrong,',
        description:
          'Failed to update task status. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => onRefresh(),
      });
    }
  };

  const handleUpdateTask = async (taskId: string, task: Task) => {
    try {
      const updatedTask = await updateTask(taskId, task);

      setTasks(
        prev => prev.map(t => (t._id === taskId ? updatedTask : t)), // ✅ replace with updatedTask
      );

      showModal({
        title: 'All Set',
        description: 'Update Saved',
        iconName: 'checkbox-marked-circle-outline',
        mode: 'success',
        onConfirm: () => setEditMode(false),
        buttonRow: false,
      });
      return updatedTask;
    } catch (error: any) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        title: 'Something Went Wrong,',
        description: 'Failed to update task. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => onRefresh(),
      });
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
    if (hour < 12) return 'Rise & Shine!';
    if (hour < 15) return 'Midday Vibes!';
    if (hour < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  const handleToggleTaskCompletion = async (taskId: string) => {
    try {
      // Get the task and compute its next status first
      const task = tasks.find(t => t._id === taskId);
      if (!task) return;

      const newStatus = !task.completed;

      // Optimistically update UI
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t._id === taskId ? { ...t, completed: newStatus } : t,
        ),
      );

      // Call backend with the new status
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      showModal({
        mode: 'error',
        iconName: 'wifi-alert',
        title: 'Something Went Wrong,',
        description: 'Failed to update task. Check your connection and retry.',
        buttonRow: false,
        onConfirm: () => onRefresh(),
      });

      // Revert UI if API fails
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t._id === taskId ? { ...t, completed: !t.completed } : t,
        ),
      );
    }
  };
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // for 'All'
  });

  const subtitle =
    filter === 'all'
      ? `${tasks.length} tasks in total`
      : filter === 'pending'
      ? `${filteredTasks.length} pending tasks`
      : `${filteredTasks.length} completed tasks`;
  return (
    <>
      {loading ? (
        <View
          style={[
            styles.container,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <ActivityIndicator size="large" color={theme.colors.primaryIcon} />
        </View>
      ) : (
        <>
          <Header
            title={getGreeting()}
            showChips
            showAdd
            subtitle={subtitle}
            onPressAdd={handlePresentModal}
            onFilterChange={setFilter} // ✅ update filter state when chip is tapped
          />
          <View style={styles.container}>
            {filteredTasks.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon
                  name="notebook-edit-outline"
                  size={64}
                  color={theme.colors.secondaryIcon}
                />

                <Text style={styles.emptyTextStyle}>You’re clear for now</Text>
              </View>
            ) : (
              <FlatList
                data={filteredTasks} // ✅ only filtered tasks shown
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
        </>
      )}
      <CustomBottomSheet
        ref={bottomSheetRef}
        onClose={handleHideModal}
        snapPoints={snapPoints}
        title="Create Task"
      >
        <AddTask onCancel={handleHideModal} onSubmit={handleAddTask} />
      </CustomBottomSheet>

      <CustomBottomSheet
        ref={moreRef}
        onClose={handleHideModal}
        title={editMode ? 'Update' : 'Actions'}
        snapPoints={moreSnapPoints}
      >
        {!editMode ? (
          <View style={styles.parentView}>
            <Pressable
              onPress={() => {
                closeMore();
                showModal({
                  mode: 'error',
                  title: 'Are You Sure?',
                  iconColor: '#DC3545',
                  description:
                    'This action can’t be undone. Do you want to proceed?',
                  iconName: 'delete-outline',
                  onCancel: () => openMore(),
                  onConfirm: () => {
                    handleDeleteTask(selectedTask?._id);
                    closeMore();
                  },
                });
              }}
              style={styles.childrenWrapperStyle}
            >
              <Text style={styles.text}>Remove</Text>
              <Icon
                name="delete-outline"
                size={20}
                color={theme.colors.secondaryButtonText}
              />
            </Pressable>

            <Pressable
              style={styles.editColor}
              onPress={() => setEditMode(true)}
            >
              <Text style={styles.modalText}>Update</Text>
              <Pressable hitSlop={10}>
                <Icon
                  name="square-edit-outline"
                  size={20}
                  color={theme.colors.secondaryButtonText}
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
      </CustomBottomSheet>
    </>
  );
};

export default HomeScreen;
