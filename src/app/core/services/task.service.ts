
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/enviornment';
import { Task } from '../../models/task-item.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  createTask(task: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/taskitems`, task);
  }

  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/taskitems`);
  }

  getPagedTasks(search: string = '', page: number = 1, pageSize: number = 5, sort: string = 'dueDate_desc') {
    const params = new HttpParams()
      .set('search', search)
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort);

    return this.http.get<{ items: Task[], totalCount: number }>(`${environment.apiUrl}/taskitems/paged`, { params });
  }

  getTaskStatsByDueRange(days: number) {
    return this.http.get<{ dueDate: string; count: number }[]>(
      `${environment.apiUrl}/taskitems/chart?days=${days}`
    );
  }
  updateTask(task: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/taskitems/${task.taskId}`, task);
  }




}
