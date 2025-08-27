export interface Task {
  item: {
    _id?: string;
    title: string;
    description: string;
    createdAt?: Date;
  };
  onDelete?: (id: string | undefined) => void;
  loadingCard?: boolean;
}
