import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SignUpForm, SignUpResponse } from '../models/signup.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API = 'http://localhost:3000/api';
  private token: string = '';
  private isAuth: boolean = false;
  private authNotifier: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  postLogin(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
    this.isAuth = true;
    this.authNotifier.next(true);
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth', 'login']);
      return;
    }
  }

  getToken() {
    return this.token;
  }

  getAuthNotifier() {
    return this.authNotifier.asObservable();
  }

  getAuthStatus() {
    return this.isAuth;
  }

  signUp(user: SignUpForm) {
    this.http
      .post<SignUpResponse>(this.API + '/auth/signup', user)
      .subscribe((res) => {
        this.snackBar.open(res.message, '', { duration: 2000 });
        this.postLogin(res.token);
        this.router.navigate(['/auth', 'verify-email']);
      });
  }
}
