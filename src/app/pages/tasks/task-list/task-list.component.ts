import { Component, ElementRef, ViewChild } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../models/task-item.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  isLoading = false;
  tasks: Task[] = [];
  search = '';
  sort = 'dueDate_desc';
  page = 1;
  pageSize = 5;
  totalCount = 0;

  @ViewChild('editModal') editModal!: ElementRef;
  editTask: any = {};

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getPagedTasks(this.search, this.page, this.pageSize, this.sort)
      .subscribe(res => {
        this.tasks = res.items;
        this.totalCount = res.totalCount;
      });
  }

  onSearchChange() {
    this.page = 1;
    this.loadTasks();
  }

  onSortChange(sort: string) {
    this.sort = sort;
    this.loadTasks();
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadTasks();
  }

  openEditModal(task: any): void {
    this.editTask = { ...task }; // shallow copy
    (this.editModal.nativeElement as HTMLDialogElement).showModal();
  }

  closeModal(): void {
    (this.editModal.nativeElement as HTMLDialogElement).close();
  }

  submitEdit(): void {
    console.log(this.editTask)
    this.taskService.updateTask(this.editTask).subscribe({
      next: () => {
        this.closeModal();
        this.loadTasks();
      },
      error: (err) => console.error('Update failed', err)
    });
  }


}
