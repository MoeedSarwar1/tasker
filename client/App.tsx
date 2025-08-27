import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

const App = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getAllWorkOuts = async () => {
      try {
        // replace with your actual backend URL
        const response = await fetch('http://localhost:3000/api/tasks');
        const json = await response.json();
        setWorkouts(json);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    getAllWorkOuts();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text style={{ padding: 10, fontSize: 16 }}>{item.title}</Text>
      <Text style={{ padding: 10, fontSize: 16 }}>{item.description}</Text>
      <Text style={{ padding: 10, fontSize: 16 }}>{item.createdAt}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <FlatList
        data={workouts}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default App;
