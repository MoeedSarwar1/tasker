export interface Task {
  item: {
    user?: Item;
    _id?: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
    priority?: 'Low Key' | 'Medium' | 'Urgent';
    assignedTo?: string;
    createdAt?: Date;
  };
  onChange?: (id: string | undefined, completed: boolean) => void;
  onMorePress?: (id: string | undefined) => void;
}
interface Item {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string; // This should probably be string, not boolean
  avatar?: string;
  isFriend?: boolean;
}
