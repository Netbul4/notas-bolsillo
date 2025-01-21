export interface Task {
  id: string;
  title: string;
  subjectId: string;
  tag: string;
  description: string;
  imageUrl: string;
}

export interface Subject {
  id: string;
  name: string;
}
