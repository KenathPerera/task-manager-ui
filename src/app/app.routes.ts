import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/tasks/task-list/task-list.component';
import { TaskCreateComponent } from './pages/tasks/task-create/task-create.component';
import { HomeComponent } from './core/layout/home/home.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { RegisterComponent } from './pages/Auth/register/register.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'all-tasks', component: TaskListComponent },
    { path: 'create', component: TaskCreateComponent, canActivate: [adminGuard] },
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }

];
