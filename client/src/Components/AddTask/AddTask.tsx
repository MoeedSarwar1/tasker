import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Button from '../Button';
import Chip from '../Chips';
import Text from '../Text';

const chipData = [
  { label: 'High Priority', color: '#333333' }, // Dark grey
  { label: 'Medium Priority', color: '#666666' }, // Medium grey
  { label: 'Low Priority', color: '#999999' }, // Light grey
];

interface AddTaskProps {
  onSubmit: (task: {
    title: string;
    description: string;
    priority: 'Low priority' | 'Medium priority' | 'High priority' | null;
  }) => void;
  onCancle: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onSubmit, onCancle }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedChip, setSelectedChip] = useState(null);

  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      onSubmit({
        title,
        description,
        priority: selectedChip as
          | 'Low priority'
          | 'Medium priority'
          | 'High priority'
          | null,
      });
      setTitle('');
      setDescription('');
      setSelectedChip(null);
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
      <Text style={styles.label}>Priority</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {chipData.map(chip => (
          <Chip
            key={chip.label}
            label={chip.label}
            color={chip.color}
            selected={selectedChip === chip.label}
            onPress={() => setSelectedChip(chip.label)}
          />
        ))}
      </View>

      <View style={styles.buttonRow}>
        <View style={{ flex: 1 }}>
          <Button title="Cancel" onPress={onCancle} style={styles.button} />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Add Task"
            style={styles.addButton}
            onPress={handleSubmit}
          />
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
    borderWidth: 1,
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
    marginTop: 24,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#C0C0C0',
  },
  addButton: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#4B4B4B',
  },
});

export default AddTask;
