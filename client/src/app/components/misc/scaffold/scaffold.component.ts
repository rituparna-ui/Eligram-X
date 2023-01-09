import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  private isAuthSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.isAuthSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isAuth = this.authService.getAuthStatus();
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
