import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private readonly STORAGE_KEY = 'tasks';

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadTasks();
    }
  }

  private loadTasks(): void {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem(this.STORAGE_KEY);
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
    }
  }

  private saveTasks(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    const newTask: Task = {
      ...task,
      id: Date.now()
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }
}
