export interface HeaderProps {
  title: string;
  onPressAdd?: () => void;
  iconName?: string;
  subtitle?: string;
  onFilterChange?: (filter: string) => void; // 🔥 new prop
  showChips?: boolean;
  showAdd?: boolean;
}
