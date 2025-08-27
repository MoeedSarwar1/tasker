import { API_URL } from '@env';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskCard from './src/Components/TaskCard/TaskCard';

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllWorkOuts = async () => {
      try {
        // replace with your actual backend URL
        const response = await fetch(`${API_URL}/api/tasks`);
        const json = await response.json();
        setWorkouts(json);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    getAllWorkOuts();
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
          item={{
            title: 'Loading...',
            description: 'Please wait while we fetch your tasks.',
          }}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {workouts.length === 0 ? (
        <TaskCard
          item={{
            title: 'No Tasks Available',
            description: 'Please add some tasks.',
          }}
        />
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => <TaskCard item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
