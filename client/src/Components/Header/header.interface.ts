export interface HeaderProps {
  title: string;
  onPressAdd: () => void;
  bottomSheetHeader?: boolean;
  iconName?: string;
  subtitle?: string;
  onFilterChange?: (filter: string) => void; // 🔥 new prop
  showChips?: boolean;
}
