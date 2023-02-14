import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../components/admin/datatable/datatable.component';
import { AdminDashboardData } from '../models/adminDashboard.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  readonly API = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getDashboardStats() {
    return this.http.get<{ message: string; data: AdminDashboardData }>(
      this.API + '/admin/dashboard'
    );
  }

  getUsers(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  getUsersByStatus(status: string) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users', {
      params: new HttpParams().append('status', status),
    });
  }
}
