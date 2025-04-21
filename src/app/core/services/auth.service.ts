import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/enviornment';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  role: string | string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  register(payload: { username: string; password: string; roles: string[] }): Observable<any> {
    console.log("here")
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  login(payload: { username: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, payload);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getCurrentUser(): { username: string, roles: string[] } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const roles = Array.isArray(decoded.role) ? decoded.role : [decoded.role];
      return { username: decoded.sub, roles };
    } catch {
      return null;
    }
  }
}
