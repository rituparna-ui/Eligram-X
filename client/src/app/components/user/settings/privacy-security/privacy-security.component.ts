import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getUserSessions().subscribe((data) => {
      this.userSessions = data.sessions.sessions;
      const keys: string[] = [];
      this.userSessions.forEach((x) => {
        keys.push(Object.keys(x)[0]);
      });
      this.keys = keys;
      console.log(this.keys);
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
      console.log(data);
    });
  }
}
