import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostReport } from '../models/postReports';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  readonly API = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getPostReports() {
    return this.http.get<{
      message: string;
      reports: PostReport[];
    }>(this.API + '/admin/reports/posts');
  }
}
