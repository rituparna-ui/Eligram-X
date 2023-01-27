import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-privacy-security',
  templateUrl: './privacy-security.component.html',
  styleUrls: ['./privacy-security.component.css'],
})
export class PrivacySecurityComponent implements OnInit {
  userSessions: {
    [key: string]: {
      browser: string;
      ip: string;
      os: string;
      platform: string;
      version: string;
    };
  }[] = [];

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getUserSessions().subscribe((data) => {
      data.sessions.sessions.forEach((x) => {
        console.log(x[Object.keys(x)[0]]);
      });
    });
  }
}
