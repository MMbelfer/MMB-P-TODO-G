// Define what a Task looks like
export interface Task {
  id: string;
  title: string;
  description: string;
}

// Define what a Column looks like
export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface User {
  name: string;
  role: string;
  userid: string;
}