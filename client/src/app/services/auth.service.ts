import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SignUpForm, AuthResponse, LoginForm } from '../models/auth.model';
import { AuthServiceUser } from '../models/authUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API = 'http://10.1.5.55:3000/api';
  private token: string = '';
  private isAuth: boolean = false;
  private authNotifier: Subject<boolean> = new Subject<boolean>();
  private user: AuthServiceUser = { id: '', role: '', state: -1 };
  private userNotifier: Subject<AuthServiceUser> =
    new Subject<AuthServiceUser>();

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
    try {
      this.user = JSON.parse(window.atob(token.split('.')[1]));
      this.userNotifier.next(this.user);
    } catch (error) {
      this.postLogout();
    }
  }

  postLogout() {
    this.http.post(this.API + '/auth/logout', {}).subscribe();
    localStorage.removeItem('token');
    this.token = '';
    this.isAuth = false;
    this.authNotifier.next(false);
    this.router.navigate(['/auth', 'login']);
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth', 'login']);
      return;
    }
    this.postLogin(token);
    this.http
      .post<{
        message: string;
        status: number;
        valid: boolean;
      }>(this.API + '/auth/verify-token', { token })
      .subscribe((res) => {
        if (!res.valid) {
          this.postLogout();
        }
      });
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

  getUser() {
    return this.user;
  }

  getUserNotifier() {
    return this.userNotifier.asObservable();
  }

  signUp(user: SignUpForm) {
    this.http
      .post<AuthResponse>(this.API + '/auth/signup', user)
      .subscribe((res) => {
        this.snackBar.open(res.message, '', { duration: 2000 });
        this.postLogin(res.token);
        this.router.navigate(['/auth', 'verify-email']);
      });
  }

  login(user: LoginForm) {
    this.http
      .post<AuthResponse>(this.API + '/auth/login', user)
      .subscribe((res) => {
        this.snackBar.open(res.message, '', { duration: 2000 });
        this.postLogin(res.token);
        this.router.navigate(['/']);
      });
  }

  verifyEmail(vcode: number) {
    this.http
      .post<AuthResponse>(this.API + '/auth/verify-email', { vcode })
      .subscribe((res) => {
        this.postLogin(res.token);
        this.router.navigate(['/auth', 'complete-profile']);
      });
  }

  completeProfile(gender: string, dateOfBirth: string) {
    this.http
      .post<AuthResponse>(this.API + '/auth/complete-profile', {
        gender,
        dateOfBirth,
      })
      .subscribe((res) => {
        this.postLogin(res.token);
        this.router.navigate(['/']);
      });
  }

  signInWithGoogle(idToken: string) {
    this.http
      .post<AuthResponse>(this.API + '/auth/google', { idToken })
      .subscribe((res) => {
        this.snackBar.open(res.message, '', { duration: 2000 });
        this.postLogin(res.token);
        this.router.navigate(['/']);
      });
  }

  sendPasswordResetCode(email: string) {
    return this.http.post<{ message: string; status: number }>(
      this.API + '/auth/forgot-password',
      { email }
    );
  }

  resetPassword(resetCode: number, password: string, email: string) {
    this.http
      .post<AuthResponse>(this.API + '/auth/reset-password', {
        resetCode,
        password,
        email,
      })
      .subscribe((res) => {
        this.snackBar.open(res.message, '', { duration: 2000 });
        this.postLogin(res.token);
        this.router.navigate(['/']);
      });
  }
}
