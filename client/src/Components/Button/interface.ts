import { TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}
