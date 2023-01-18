import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css'],
})
export class ProfileHomeComponent implements OnInit {
  user?: UserServiceUser;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService
      .fetchUserByUsername(this.route.snapshot.params['username'])
      .subscribe({
        next: (user) => {
          this.user = user;
        },
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });
  }
}
