import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  state: number;
  role: string;
  lastSeen: number;
  banned: boolean;
  adminVerified: boolean;
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})
export class DatatableComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    if (Object.keys(this.route.snapshot.queryParams).length == 0) {
      this.adminService.getUsers().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    }
    if (this.route.snapshot.queryParams['status']) {
      this.adminService
        .getUsersByStatus(this.route.snapshot.queryParams['status'])
        .subscribe((data) => {
          this.ELEMENT_DATA = data.users;
          this.totalCount = data.totalCount;
          this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
        });
    }
  }

  isLoading = false;

  totalCount = 0;
  ELEMENT_DATA: User[] = [];
  displayedColumns: string[] = [
    'name',
    'username',
    'role',
    'state',
    'adminVerified',
    'lastSeen',
    'menu',
  ];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  pageChange(event: PageEvent) {
    this.isLoading = true;
    this.adminService.getUsers(event.pageIndex).subscribe((data) => {
      this.isLoading = false;
      this.ELEMENT_DATA = data.users;
      this.totalCount = data.totalCount;
      this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
    });
  }
}
