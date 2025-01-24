export interface Task {
  id: string;
  title: string;
  subject: string;
  tag: string;
  description: string;
  imageUrl: string;
}

export interface Subject {
  id: string;
  name: string;
}
