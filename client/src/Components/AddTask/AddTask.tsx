import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import Button from '../Button';
import Chip from '../Chips';
import Text from '../Text';

const chipData = [
  { label: 'High Priority', color: '#333333' },
  { label: 'Medium Priority', color: '#666666' },
  { label: 'Low Priority', color: '#999999' },
];
interface AddTaskProps {
  onSubmit: (task: {
    title: string;
    description: string;
    dueDate: Date | string;
    priority: 'Low priority' | 'Medium priority' | 'High priority' | null;
  }) => void;
  onCancel: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    // always hide picker on Android after selecting/canceling
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };
  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      onSubmit({
        title,
        description,
        dueDate: date.toDateString() as Date | string,
        priority: selectedChip as
          | 'Low priority'
          | 'Medium priority'
          | 'High priority'
          | null,
      });
      setTitle('');
      setDescription('');
      setSelectedChip(null);
      setDate(new Date()); // optional reset
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
          multiline
        />
      </View>

      <Text style={styles.label}>Select Due Date</Text>
      <View
        style={{
          justifyContent: 'center',
          marginBottom: 12,
          alignItems: 'center',
        }}
      >
        {Platform.OS === 'android' ? (
          <>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={date}
                dateFormat="shortdate"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <Button
              title={date.toDateString()}
              onPress={() => setShowDatePicker(true)}
            />
          </>
        ) : (
          <DateTimePicker
            mode="date"
            value={date}
            dateFormat="shortdate"
            display="spinner"
            onChange={handleDateChange}
          />
        )}
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
          <Button title="Cancel" onPress={onCancel} style={styles.button} />
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
