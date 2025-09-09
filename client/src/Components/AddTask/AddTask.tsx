import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { useTheme } from '../../context/Theme-context';
import Button from '../Button';
import Chip from '../Chips';
import Text from '../Text';
import { bottomSheetStyles } from './styles';
import { colors } from '../../theme/colors';

interface AddTaskProps {
  initialTask?: {
    title: string;
    description: string;
    dueDate: Date | string;
    priority: 'Urgent' | 'Medium' | 'Low Key' | null;
  };
  mode: 'add' | 'edit';
  onSubmit: (task: {
    title: string;
    description: string;
    dueDate: Date | string;
    priority: 'Urgent' | 'Medium' | 'Low Key' | null;
  }) => void;
  onCancel: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({
  initialTask,
  onSubmit,
  onCancel,
  mode,
}) => {
  const { theme } = useTheme();
  const styles = bottomSheetStyles(theme);
  const isEditing = mode === 'edit' || !!initialTask;
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(
    initialTask?.description || '',
  );

  const [selectedChip, setSelectedChip] = useState(
    initialTask?.priority || 'Normal',
  );
  const [date, setDate] = useState<Date>(
    initialTask?.dueDate ? new Date(initialTask.dueDate) : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const chipData = [
    {
      label: 'Urgent',
      color: theme.colors.chips.urgentBackground,
      textColor: theme.colors.chips.urgentText,
    },
    {
      label: 'Normal',
      color: theme.colors.chips.normalBackground,
      textColor: theme.colors.chips.normalText,
    },
    {
      label: 'Low Key',
      color: theme.colors.chips.lowKeyBackground,
      textColor: theme.colors.chips.lowKeyText,
    },
  ];
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setSelectedChip(initialTask.priority);
      setDate(new Date(initialTask.dueDate));
    }
  }, [initialTask]);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      onSubmit({
        title,
        description,
        dueDate: date.toISOString(),
        priority: selectedChip as
          | 'Low priority'
          | 'Medium priority'
          | 'High priority'
          | null,
      });

      if (!isEditing) {
        setTitle('');
        setDescription('');
        setSelectedChip(null);
        setDate(new Date());
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Heading</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Details</Text>
      <View style={styles.descriptionInput}>
        <TextInput
          style={{ width: '100%', color: theme.colors.inputTextColor }}
          placeholder="Add some notes"
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <Text style={styles.label}>Deadline</Text>
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
            display="spinner"
            onChange={handleDateChange}
          />
        )}
      </View>

      <Text style={styles.label}>Importance</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {chipData.map(chip => (
          <Chip
            id={chip.id}
            key={chip.label}
            label={chip.label}
            color={chip.color}
            textColor={chip.color}
            selected={selectedChip === chip.label}
            onPress={() => setSelectedChip(chip.label)}
          />
        ))}
      </View>

      <View style={styles.buttonRow}>
        <View style={{ flex: 1 }}>
          <Button
            title="Dismiss"
            textStyle={styles.buttonText}
            onPress={onCancel}
            style={styles.button}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title={mode === 'edit' ? 'Save Changes' : 'Create Task'}
            textStyle={styles.addButtonText}
            style={styles.addButton}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};
export default AddTask;
