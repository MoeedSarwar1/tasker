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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddTask from '../../Components/AddTask/AddTask';
import Header from '../../Components/Header/Header';
import SimpleModal from '../../Components/Modal';
import TaskCard from '../../Components/TaskCard/TaskCard';
import Text from '../../Components/Text';
import {
  deleteTask,
  fetchTasks,
  postTask,
  updateTask,
} from '../../network/Tasks';
import homeStles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [completed, setCompleted] = useState(false);

  const openMore = () => moreRef.current?.expand();
  const closeMore = () => moreRef.current?.close();

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
  }) => {
    try {
      const newTask = await postTask(task);

      // Update local tasks
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setSuccessModalVisible(true);
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
      setModalVisible(false);
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
      setCompleted(true);
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
            contentContainerStyle={{ gap: 16, paddingBottom: 150 }}
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
              <AddTask onCancle={handleHideModal} onSubmit={handleAddTask} />
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
          style={{
            backgroundColor: '#F9fafb',
            borderRadius: 16,
            zIndex: 10000,
          }}
        >
          <BottomSheetView style={styles.parentView}>
            <Pressable
              onPress={() => {
                closeMore();
                setModalVisible(true);
              }}
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
                style={{ color: '#F9fafb', fontWeight: 'bold', fontSize: 16 }}
              >
                Edit
              </Text>
              <Pressable hitSlop={10}>
                <Icon name="square-edit-outline" size={20} color="#F9fafb" />
              </Pressable>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>

      <SimpleModal
        visible={modalVisible}
        onConfirm={() => {
          handleDeleteTask(selectedTask._id);
        }}
        onCancle={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Icon name="delete-outline" size={48} color="#dc2626" />
          <Text style={styles.modalHeader}>Are You Sure?</Text>

          <Text style={styles.modalText}>
            You are about to delete this task.
          </Text>
        </View>
      </SimpleModal>
      <SimpleModal
        buttonRow={false}
        visible={successModalVisible}
        onConfirm={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Icon
            name="checkbox-marked-circle-outline"
            size={64}
            color="#28A745"
          />
          <Text style={styles.successModalHeader}>Success</Text>

          <Text style={styles.successModalText}>Task added successfully!</Text>
        </View>
      </SimpleModal>
      <SimpleModal
        buttonRow={false}
        visible={completed}
        onConfirm={() => setCompleted(false)}
      >
        <View style={styles.modalContainer}>
          <Icon
            name="checkbox-marked-circle-outline"
            size={64}
            color="#28A745"
          />
          <Text style={styles.successModalHeader}>Success</Text>

          <Text style={styles.successModalText}>
            Marked complete successfully
          </Text>
        </View>
      </SimpleModal>
    </>
  );
};

export default HomeScreen;
