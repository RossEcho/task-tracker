import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(task: Task): void {
    const current = this.tasksSubject.value;
    this.tasksSubject.next([...current, task]);
  }

  updateTask(updatedTask: Task): void {
    const updated = this.tasksSubject.value.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(updated);
  }

  deleteTask(id: number): void {
    const filtered = this.tasksSubject.value.filter(task => task.id !== id);
    this.tasksSubject.next(filtered);
  }

  getCurrentTasks(): Task[] {
    return this.tasksSubject.value;
  }
}
