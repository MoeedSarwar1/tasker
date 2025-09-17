export interface ReusableBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[]; // e.g. ['25%', '50%']
  initialIndex?: number; // default = -1 (closed)
  onClose?: () => void;
  title?: string;
  subtitle?: string;
}
