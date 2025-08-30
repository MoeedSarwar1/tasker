import { API_URL } from '@env';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Platform, RefreshControl, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import AddTask from './src/Components/AddTask/AddTask';
import Header from './src/Components/Header/Header';
import TaskCard from './src/Components/TaskCard/TaskCard';
import useApi from './src/network/useApi';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const { deleteData, updateStatus, postData, fetchData } = useApi();
  const [refreshing, setRefreshing] = useState(false);
  const snapPoints = useMemo(() => ['45%'], []);

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

  const postTask = async (task: { title: string; description: string }) => {
    try {
      await postData('/api/tasks', task);
      setTasks(prevTasks => [
        ...prevTasks,
        { ...task, id: Date.now().toString() },
      ]);
      Alert.alert('Task Added Successfully');
      bottomSheetRef.current?.close();
    } catch (error) {
      console.error('Error posting task:', error);
    }
  };

  useEffect(() => {
    console.log('Fetching tasks from API...', API_URL);
    Platform.OS === 'android' && SplashScreen.hide();

    const getAllWorkOuts = async () => {
      try {
        const data = await fetchData('/tasks'); // notice `/tasks`, no double "api"
        console.log('Response:', data);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    getAllWorkOuts();
  }, []);

  const deleteTask = async (id: string) => {
    try {
      await deleteData('/tasks', id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (id: string, completed: boolean) => {
    try {
      await updateStatus('/tasks', id, completed);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F8F8F8',
        }}
      >
        <TaskCard
          loadingCard
          item={{
            title: 'Loading...',
            description: 'Please wait while we fetch your tasks.',
            createdAt: undefined,
          }}
        />
      </SafeAreaView>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="My Tasks" onPressAdd={() => handlePresentModal()} />
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
            ListFooterComponent={
              <Text style={{ textAlign: 'center', padding: 10, color: 'grey' }}>
                Showing all {tasks.length} tasks
              </Text>
            }
          />
        )}
      </SafeAreaView>
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
          <Header
            title="Add Task"
            onPressAdd={() => handleHideModal()}
            iconName="close"
            bottomSheetHeader
          />

          <AddTask onCancle={handleHideModal} onSubmit={postTask} />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default App;
