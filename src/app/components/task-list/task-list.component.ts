import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSortModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['done', 'title', 'dueDate', 'priority', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);
  editingId: number | null = null;
  editForm: FormGroup;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['Medium', Validators.required],
    });
  }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks: Task[]) => {
      this.dataSource.data = tasks;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  startEdit(task: Task): void {
    this.editingId = task.id;
    this.editForm.setValue({
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editForm.reset();
  }

  saveEdit(task: Task): void {
    if (this.editForm.valid) {
      const updatedTask: Task = {
        ...task,
        ...this.editForm.value
      };
      this.taskService.updateTask(updatedTask);
      this.editingId = null;
    }
  }

  toggleCompleted(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask);
  }

  get titleControl(): FormControl {
    return this.editForm.get('title') as FormControl;
  }

  get dueDateControl(): FormControl {
    return this.editForm.get('dueDate') as FormControl;
  }

  get priorityControl(): FormControl {
    return this.editForm.get('priority') as FormControl;
  }
}
