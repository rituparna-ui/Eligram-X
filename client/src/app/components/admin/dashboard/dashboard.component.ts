import { Component, OnInit } from '@angular/core';
import { AdminDashboardData } from 'src/app/models/adminDashboard.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboardData?: AdminDashboardData;
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getDashboardStats().subscribe((data) => {
      this.dashboardData = data.data;
    });
  }
}
