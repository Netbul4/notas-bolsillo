export interface Task {
  id: string;
  title: string;
  subject: string;
  description: string;
  imageUrl: string;
}

export interface Subject {
  id: string;
  name: string;
  doneTasks: number;
  totalTasks: number;
}
