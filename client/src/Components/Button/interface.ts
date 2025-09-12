import { ViewStyle } from 'react-native';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  disabled?: boolean;
}
