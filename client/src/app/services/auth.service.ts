import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoadingModalComponent } from '../components/misc/loading-modal/loading-modal.component';
import { SignUpForm, AuthResponse, LoginForm } from '../models/auth.model';
import { UserService } from './user.service';

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
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  postLogin(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
    this.isAuth = true;
    this.authNotifier.next(true);
    try {
      const user = JSON.parse(window.atob(token.split('.')[1]));
      this.userService.fetchCurrentUser(user.id);
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

  connectDiscord(code: string) {
    this.http
      .post<{ message: string; status: number; username: string }>(
        this.API + '/auth/discord',
        { code, token: this.token }
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['/u', res.username]);
        },
        error: (err) => {
          this.snackBar.open('Error Connecting to discord', '', {
            duration: 1500,
          });
          this.router.navigate(['/u', this.userService.getUser().username]);
        },
      });
  }

  getUserSessions() {
    return this.http.get<{
      message: string;
      sessions: {
        sessions: [
          {
            [key: string]: {
              browser: string;
              ip: string;
              os: string;
              platform: string;
              version: string;
            };
          }
        ];
      };
    }>(this.API + '/auth/sessions');
  }

  disconnectDiscord() {
    const dialogRef = this.dialog.open(LoadingModalComponent, {
      disableClose: true,
    });
    this.http.post(this.API + '/auth/discord/disconnect', {}).subscribe({
      next: (data) => {
        dialogRef.close();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.snackBar.open('Error Disconnecting', '', { duration: 1500 });
        dialogRef.close();
      },
    });
  }
}
