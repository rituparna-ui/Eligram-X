import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
