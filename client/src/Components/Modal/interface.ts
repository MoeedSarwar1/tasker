
export interface SimpleModalProps {
  visible: boolean;
  onCancle?: () => void;
  title?: string;
  iconName?: string;
  iconColor?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  buttonRow?: boolean;
  description?: string;
  mode?: 'success' | 'confirmation' | 'error';
}
