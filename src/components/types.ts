export interface Task {
  id: string;
  title: string;
  description: string;
  columnId?: string; // הקישור לעמודה
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}