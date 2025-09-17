export interface Friends {
  item: {
    _id?: string;
    receiver?: Item;
    sender?: Item;
    firstName: string;
    lastName: string;
    email?: string;
    avatar: string | null;
    isFriend?: boolean;
    status?: 'pending' | 'accepted' | 'rejected' | 'sent';
  };
  onSecondaryPress: () => {};
  onPrimaryPress: () => {};
  buttons?: boolean;
  buttonRow?: boolean;
  title?: string;
}

interface Item {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string; // This should probably be string, not boolean
  avatar: string | null;
  isFriend?: boolean;
  status?: 'pending' | 'accepted' | 'rejected' | 'sent';
}
