import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private adminService: AdminService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const filter = this.route.snapshot.params['filter'];
    if (filter === 'all') {
      this.adminService.getAllUsers().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'online') {
      this.adminService.getOnlineUsers().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'idle') {
      this.adminService.getIdleUsers().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'offline') {
      this.adminService.getOfflineUsers().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'banned') {
      this.adminService.getBannedUsers().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'admins') {
      this.adminService.getAllAdmins().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'admin-verified') {
      this.adminService.getAllAdminVerifiedUsers().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'complete') {
      this.adminService.getProfileCompleteUsers().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'verified') {
      this.adminService.getEmailVerifiedUsers().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'unverified') {
      this.adminService.getUnverifiedUsers().subscribe((data) => {
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else {
      console.log(filter);
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
    const filter = this.route.snapshot.params['filter'];
    if (filter === 'all') {
      this.adminService.getAllUsers(event.pageIndex).subscribe((data) => {
        this.isLoading = false;
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'online') {
      this.adminService.getOnlineUsers(event.pageIndex).subscribe((data) => {
        this.isLoading = false;
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'idle') {
      this.adminService.getIdleUsers(event.pageIndex).subscribe((data) => {
        this.isLoading = false;
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'offline') {
      this.adminService.getOfflineUsers(event.pageIndex).subscribe((data) => {
        this.isLoading = false;
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'banned') {
      this.adminService.getBannedUsers(event.pageIndex).subscribe((data) => {
        this.isLoading = false;
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'admins') {
      this.adminService.getAllAdmins(event.pageIndex).subscribe((data) => {
        this.isLoading = false;
        this.ELEMENT_DATA = data.users;
        this.totalCount = data.totalCount;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    } else if (filter === 'admin-verified') {
      this.adminService
        .getAllAdminVerifiedUsers(event.pageIndex)
        .subscribe((data) => {
          this.isLoading = false;
          this.ELEMENT_DATA = data.users;
          this.totalCount = data.totalCount;
          this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
        });
    } else if (filter === 'complete') {
      this.adminService
        .getProfileCompleteUsers(event.pageIndex)
        .subscribe((data) => {
          this.isLoading = false;
          this.ELEMENT_DATA = data.users;
          this.totalCount = data.totalCount;
          this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
        });
    } else if (filter === 'verified') {
      this.adminService
        .getEmailVerifiedUsers(event.pageIndex)
        .subscribe((data) => {
          this.isLoading = false;
          this.ELEMENT_DATA = data.users;
          this.totalCount = data.totalCount;
          this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
        });
    } else if (filter === 'unverified') {
      this.adminService
        .getUnverifiedUsers(event.pageIndex)
        .subscribe((data) => {
          this.isLoading = false;
          this.ELEMENT_DATA = data.users;
          this.totalCount = data.totalCount;
          this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
        });
    } else {
      console.log(filter);
    }
  }

  banUser(id: string) {
    this.adminService.banUser(id).subscribe((data) => {
      this.snackbar.open(data.message, '', { duration: 1500 });
    });
  }

  unbanUser(id: string) {
    this.adminService.unbanUser(id).subscribe((data) => {
      this.snackbar.open(data.message, '', { duration: 1500 });
    });
  }

  deleteUser(id: string) {
    this.adminService.deleteUser(id).subscribe((data) => {
      this.snackbar.open(data.message, '', { duration: 1500 });
    });
  }

  toggleAdminVerify(event: MatSlideToggleChange, id: string) {
    if (event.checked == true) {
      this.adminService.setAdminVerified(id).subscribe((data) => {
        this.snackbar.open(data.message, '', { duration: 1500 });
      });
    } else {
      this.adminService.unsetAdminVerified(id).subscribe((data) => {
        this.snackbar.open(data.message, '', { duration: 1500 });
      });
    }
  }

  promote(id: string) {
    this.adminService.promoteUser(id).subscribe((data) => {
      this.snackbar.open(data.message, '', { duration: 1500 });
    });
  }

  demote(id: string) {
    this.adminService.demoteUser(id).subscribe((data) => {
      this.snackbar.open(data.message, '', { duration: 1500 });
    });
  }
}
