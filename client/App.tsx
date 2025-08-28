import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './src/Components/Header/Header';
import TaskCard from './src/Components/TaskCard/TaskCard';
import useApi from './src/network/useApi';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const { fetchData } = useApi();
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModal = () => {
    bottomSheetRef.current?.expand();
  };

  const handleHideModal = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await fetchData('/api/tasks');
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={({ item }) => <TaskCard item={item} />}
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
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16 }}>➕ Add a new task here</Text>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default App;
