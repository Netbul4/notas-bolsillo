export interface Task {
  id: string;
  title: string;
  subject: string;
  description: string;
  imageUrl: string;
}

export interface Subject {
  course_id: number;
  course_name: string;
  teacher_name: string;
  done_tasks: string;
  total_tasks: string;
}
