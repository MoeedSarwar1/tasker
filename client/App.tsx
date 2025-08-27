import { API_URL } from '@env';
import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './src/Components/Header/Header';
import TaskCard from './src/Components/TaskCard/TaskCard';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllWorkOuts = async () => {
      try {
        // replace with your actual backend URL
        const response = await fetch(`${API_URL}/api/tasks`);
        const json = await response.json();
        setTasks(json);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    getAllWorkOuts();
  }, [tasks]);

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
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="My Tasks" />
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
  );
};

export default App;
