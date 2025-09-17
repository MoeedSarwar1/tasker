export interface AddTaskProps {
  initialTask?: {
    title: string;
    description: string;
    dueDate: Date | string;
    priority: 'urgent' | 'medium' | 'low';
  };
  mode: 'add' | 'edit';
  onSubmit: (task: {
    title: string;
    description: string;
    dueDate: Date | string;
    priority?: 'urgent' | 'medium' | 'low';
  }) => void;
  onCancel: () => void;
}
