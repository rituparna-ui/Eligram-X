import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  resetCodeSent = false;
  email = '';
  message = '';
  forgotPasswordForm: FormGroup = new FormGroup({});
  newPasswordForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    this.newPasswordForm = new FormGroup({
      resetCode: new FormControl(null, [
        Validators.required,
        Validators.min(100000),
        Validators.max(999999),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  onSendResetCode() {
    const email = this.forgotPasswordForm.value.email;
    this.authService.sendPasswordResetCode(email).subscribe((data) => {
      this.email = email;
      this.resetCodeSent = true;
      this.message = data.message;
    });
  }
  resetPassword() {
    const { resetCode, password } = this.newPasswordForm.value;
    this.authService.resetPassword(resetCode, password, this.email);
  }
}
