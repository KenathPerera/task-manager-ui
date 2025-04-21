import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';

@NgModule({
    declarations: [TaskCreateComponent, TaskListComponent, RegisterComponent, LoginComponent],
    imports: [ReactiveFormsModule, SharedModule, FormsModule],
    exports: [TaskCreateComponent, TaskListComponent, RegisterComponent, LoginComponent]
})
export class FeatureModule { }
