export interface Friends {
  item: {
    _id?: string;
    firstName: string;
    lastName: string;
    email?: boolean;
    avatar?: string;
    isFriend?: boolean;
  };
  onSecondaryPress: () => {};
  onPrimaryPress: () => {};
  buttons?:boolean
  buttonRow?:boolean
  title?:string
}
