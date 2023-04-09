import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { TwoFactorModalComponent } from './two-factor-modal/two-factor-modal.component';

interface Session {
  browser: string;
  ip: string;
  os: string;
  platform: string;
  version: string;
}
@Component({
  selector: 'app-privacy-security',
  templateUrl: './privacy-security.component.html',
  styleUrls: ['./privacy-security.component.css'],
})
export class PrivacySecurityComponent implements OnInit {
  userSessions: {
    [key: string]: Session;
  }[] = [];

  keys: string[] = [];
  twoFAStatus: boolean = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.authService.getUserSessions().subscribe((data) => {
      this.userSessions = data.sessions.sessions;
      const keys: string[] = [];
      this.userSessions.forEach((x) => {
        keys.push(Object.keys(x)[0]);
      });
      this.keys = keys;
    });
    this.authService.getTwoFactorAuthStatus().subscribe((data) => {
      this.twoFAStatus = data.status;
    });
  }

  revoke(session: any) {
    const token = Object.keys(session)[0];
    this.authService.revokeToken(token);
  }

  enable2faRequest() {
    this.authService.enable2faRequest().subscribe((data) => {
      this.snackbar.open(data.message, '', { duration: 1500 });
      const dialogRef = this.dialog.open(TwoFactorModalComponent, {
        width: '50%',
        height: '55%',
        data: data.qr,
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (!data) {
          return;
        }
        this.authService.confirm2faRequest(data.otp).subscribe((data) => {
          if (!data.success) {
            this.snackbar.open(data.message, '', { duration: 2000 });
          } else {
            this.twoFAStatus = true;
          }
        });
      });
    });
  }

  disable2fa() {
    this.authService.disable2fa().subscribe((data) => {
      this.snackbar.open(data.message, '', { duration: 1500 });
      this.twoFAStatus = false;
    });
  }
}
