type NewType = string;

export interface Task {
  id: string;
  title: string;
  description: NewType;
}

export interface Column {
  id: string;
  title: string; 
  tasks: Task[];
}
