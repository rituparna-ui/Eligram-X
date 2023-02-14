import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription = new Subscription();
  filters = new FormControl<{ group: string; value: string }[]>([]);
  toppingList = [
    {
      groupName: 'status',
      options: [
        { value: 'online', view: 'Online' },
        { value: 'idle', view: 'Idle' },
        { value: 'offline', view: 'Offline' },
      ],
    },
    {
      groupName: 'users',
      options: [
        { value: 'banned', view: 'Banned' },
        { value: 'admins', view: 'Admins' },
        { value: 'admin-verified', view: 'Admin Verified' },
      ],
    },
    {
      groupName: 'profiles',
      options: [
        { value: 'complete', view: 'Complete' },
        { value: 'email-verified', view: 'Email Verified' },
        { value: 'email-unverified', view: 'Email Unverified' },
      ],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
  ngOnInit(): void {
    // this.paramSubscription = this.route.queryParams.subscribe((params) => {
    //   console.log(params);
    //   this.adminService.getUsersByFilter(params).subscribe(console.log);
    // });
    // this.adminService
    //   .getUsersByFilter(this.route.snapshot.queryParams)
    //   .subscribe();
  }

  applyFilters() {
    const kek = this.filters.value?.map((filter) => {
      return { [filter.group]: filter.value };
    });
    const query = {};
    for (let f of kek ?? []) {
      Object.assign(query, f);
    }
    this.router.navigate(['/admin/users'], {
      queryParams: query,
    });
  }
}
