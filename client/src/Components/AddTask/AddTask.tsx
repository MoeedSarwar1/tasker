import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface AddTaskProps {
  onSubmit: (task: { title: string; description: string }) => void;
  onCancle: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onSubmit, onCancle }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      onSubmit({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <View style={styles.descriptionInput}>
        <TextInput
          style={{ width: '100%', color: '#333' }}
          placeholder="Enter description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.buttonRow}>
        <View style={{ flex: 1 }}>
          <Button title="Cancel" onPress={onCancle} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Add Task" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 0,
    borderColor: '#ccc',
    color: '#333',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  descriptionInput: {
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    height: 100,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
    marginTop: 12,
  },
});

export default AddTask;
