export interface Task {
    id: number;
    title: string;
    dueDate: Date;
    priority: 'Low' | 'Medium' | 'High';
    completed: boolean;
  }
  