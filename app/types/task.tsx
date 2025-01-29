export interface Task {
  task_id: string;
  title: string;
  subject: string;
  description: string;
  image_url: string;
  created_by: number;
  created_at: Date;
}

export interface Subject {
  course_id: number;
  course_name: string;
  teacher_name: string;
  done_tasks: string;
  total_tasks: string;
}
