export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  color?: string; // background color when selected
  textColor?: string;
  id?: string;
}
