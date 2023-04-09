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

  getAllUsers(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users/all', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  getOnlineUsers(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users/online', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  getIdleUsers(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users/idle', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  getOfflineUsers(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users/offline', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  getBannedUsers(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users/banned', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  getAllAdmins(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users/admins', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  getAllAdminVerifiedUsers(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users/admin-verified', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  getProfileCompleteUsers(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users/complete', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  getEmailVerifiedUsers(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users/verified', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  getUnverifiedUsers(page?: number) {
    return this.http.get<{
      message: string;
      users: User[];
      totalCount: number;
    }>(this.API + '/admin/users/unverified', {
      params: new HttpParams().append('page', page || 0),
    });
  }

  banUser(id: string) {
    return this.http.post<{ message: string; status: number }>(
      this.API + '/admin/users/ban',
      {
        userId: id,
      }
    );
  }

  unbanUser(id: string) {
    return this.http.post<{ message: string; status: number }>(
      this.API + '/admin/users/unban',
      {
        userId: id,
      }
    );
  }

  deleteUser(id: string) {
    return this.http.post<{ message: string; status: number }>(
      this.API + '/admin/users/delete',
      {
        userId: id,
      }
    );
  }

  setAdminVerified(id: string) {
    return this.http.post<{ message: string; status: number }>(
      this.API + '/admin/users/admin-verify',
      {
        userId: id,
      }
    );
  }

  unsetAdminVerified(id: string) {
    return this.http.post<{ message: string; status: number }>(
      this.API + '/admin/users/admin-unverify',
      {
        userId: id,
      }
    );
  }

  promoteUser(id: string) {
    return this.http.post<{ message: string; status: number }>(
      this.API + '/admin/users/promote',
      {
        userId: id,
      }
    );
  }

  demoteUser(id: string) {
    return this.http.post<{ message: string; status: number }>(
      this.API + '/admin/users/demote',
      {
        userId: id,
      }
    );
  }
}
