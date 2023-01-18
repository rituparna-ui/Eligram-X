import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserServiceUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { PostModalComponent } from '../../post/post-modal/post-modal.component';

@Component({
  selector: 'app-scaffold',
  templateUrl: './scaffold.component.html',
  styleUrls: ['./scaffold.component.css'],
})
export class ScaffoldComponent implements OnInit, OnDestroy {
  anonymous = [
    { name: 'Log In', route: '/auth/login' },
    { name: 'Sign Up', route: '/auth/signup' },
  ];
  isAuth: boolean = false;
  user: UserServiceUser = {
    _id: '',
    email: '',
    firstName: '',
    gender: '',
    lastName: '',
    role: '',
    state: 0,
    username: '',
  };
  private userSubscription: Subscription = new Subscription();
  private isAuthSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.isAuthSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.isAuth = this.authService.getAuthStatus();
    this.userSubscription = this.userService
      .getUserNotifier()
      .subscribe((user) => {
        this.user = user;
      });
    this.isAuthSubscription = this.authService
      .getAuthNotifier()
      .subscribe((auth) => {
        this.isAuth = auth;
      });
  }

  logout() {
    this.authService.postLogout();
  }
  openCreatePostModal() {
    const dialogRef = this.dialog.open(PostModalComponent, {
      width: '100%',
      height: '70%',
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.snackBar.open(data.message, '', { duration: 2500 });
      }
    });
  }
}
