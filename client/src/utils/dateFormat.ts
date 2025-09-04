/**
 * Returns a formatted task status string
 * @param completed - whether the task is completed
 * @param dueDate - the task's due date
 * @returns string like "Completed", "Due today", "Due tomorrow", "Due in 3 days", "Due Sep 15, 2025", or "Due date passed"
 */
export const getTaskStatusText = (
  completed: boolean,
  dueDate: string | Date,
) => {
  if (completed) return 'Completed';

  const now = new Date();
  const due = new Date(dueDate);

  // Clear time part for comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());

  // Calculate difference in days
  const diffTime = dueDay.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Due date passed';
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays <= 5) return `Due in ${diffDays} days`;

  // fallback to formatted date
  return `Due ${due.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;
};
