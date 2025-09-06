export interface Task {
  item: {
    _id?: string;
    title: string;
    description: string;
    completed?: boolean;
    dueDate?: string;
    priority?: 'Low priority' | 'Medium priority' | 'High priority';
    assignedTo?: string;
    createdAt?: Date;
  };
  onChange?: (id: string | undefined, completed: boolean) => void;
  onMorePress?: (id: string | undefined) => void;
}
