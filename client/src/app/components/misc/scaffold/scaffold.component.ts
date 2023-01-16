import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceUser } from 'src/app/models/authUser.model';
import { AuthService } from 'src/app/services/auth.service';

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
  user: AuthServiceUser = { id: '', role: '', state: 0 };
  userSubscription: Subscription = new Subscription();
  private isAuthSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.isAuthSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.isAuth = this.authService.getAuthStatus();
    this.userSubscription = this.authService
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
}
