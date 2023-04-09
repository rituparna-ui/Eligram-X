import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-two-fa',
  templateUrl: './verify-two-fa.component.html',
  styleUrls: ['./verify-two-fa.component.css'],
})
export class VerifyTwoFaComponent {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
  totp: number = 0;
  verify2FALogin() {
    const token = this.route.snapshot.queryParamMap.get('token') || '';
    this.authService.verify2FALogin(this.totp, token).subscribe((data) => {
      // console.log();
      if (data.status === 401) {
        this.router.navigate(['/auth', 'login']);
        this.snackbar.open(data.message, '', { duration: 1500 });
      } else {
        this.authService.postLogin(data.token);
        this.router.navigate(['/']);
      }
    });
  }
}
