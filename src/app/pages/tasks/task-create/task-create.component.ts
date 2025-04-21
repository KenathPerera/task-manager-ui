import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-create',
  standalone: false,
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  isSuccess = false;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      isCompleted: [false]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.isSuccess = true;
          this.taskForm.reset();
          setTimeout(() => this.isSuccess = false, 3000); // hide toast after 3s
          // this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error creating task:', err);
        }
      });
    }
  }
}

