export interface Task {
  item: {
    _id?: string;
    title: string;
    description: string;
    completed?: boolean;
    createdAt?: Date;
  };
  onDelete?: (id: string | undefined) => void;
  loadingCard?: boolean;
}
