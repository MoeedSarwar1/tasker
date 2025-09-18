import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { useTheme } from '../../context/Theme-context';
import Button from '../Button';
import Chip from '../Chips';
import Text from '../Text';
import { bottomSheetStyles } from './styles';
import { AddTaskProps } from './interface';

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
    initialTask?.priority || 'Medium',
  );
  const [date, setDate] = useState<Date>(
    initialTask?.dueDate ? new Date(initialTask.dueDate) : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const chipData = [
    {
      id: 'urgent',
      label: 'Urgent',
      color: theme.colors.chips.urgentBackground,
      textColor: theme.colors.chips.urgentText,
    },
    {
      id: 'medium',
      label: 'Medium',
      color: theme.colors.chips.normalBackground,
      textColor: theme.colors.chips.normalText,
    },
    {
      id: 'low',
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
        priority: selectedChip,
      });

      if (!isEditing) {
        setTitle('');
        setDescription('');
        setSelectedChip('low');
        setDate(new Date());
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.label}>Heading</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a title"
        placeholderTextColor={theme.colors.placeholderTextColor}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Details</Text>
      <View style={styles.descriptionInput}>
        <TextInput
          style={{ width: '100%', color: theme.colors.inputTextColor }}
          placeholder="Add some notes"
          placeholderTextColor={theme.colors.placeholderTextColor}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <Text style={styles.label}>Deadline</Text>
      <View style={styles.date}>
        {Platform.OS === 'android' ? (
          <>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={date}
                textColor={theme.colors.inputTextColor}
                display="default"
                onChange={handleDateChange}
              />
            )}
            <Button
              title={date.toDateString()}
              onPress={() => setShowDatePicker(true)}
              textStyle={styles.addButtonText}
              style={styles.addButton}
            />
          </>
        ) : (
          <DateTimePicker
            mode="date"
            textColor={theme.colors.inputTextColor}
            value={date}
            display="spinner"
            onChange={handleDateChange}
          />
        )}
      </View>

      <Text style={styles.label}>Importance</Text>
      <View style={styles.chipRow}>
        {chipData.map(chip => (
          <Chip
            id={chip.id}
            key={chip.label}
            label={chip.label}
            color={chip.color}
            textColor={chip.textColor}
            selected={selectedChip === chip.label}
            onPress={() => setSelectedChip(chip.label)}
          />
        ))}
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button
            title="Dismiss"
            textStyle={styles.buttonText}
            onPress={onCancel}
            style={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={mode === 'edit' ? 'Save Changes' : 'Create Task'}
            gradientColors={theme.colors.primaryButtonBackground}
            textStyle={styles.addButtonText}
            style={styles.addButton}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default AddTask;
