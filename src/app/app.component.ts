import { Component } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Build Angular App',
      dueDate: new Date(),
      priority: 'High',
      completed: false
    },
    {
      id: 2,
      title: 'Test Deployment',
      dueDate: new Date(),
      priority: 'Medium',
      completed: false
    }
  ];
}
