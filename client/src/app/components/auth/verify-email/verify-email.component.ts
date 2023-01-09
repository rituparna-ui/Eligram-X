import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  showPassword = false;
  verifyEmailForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.verifyEmailForm = new FormGroup({
      vcode: new FormControl(null, [
        Validators.required,
        Validators.min(100000),
        Validators.max(999999),
      ]),
    });
  }

  onSubmit() {
    if (this.verifyEmailForm.invalid) {
      return;
    }
    this.authService.verifyEmail(this.verifyEmailForm.value.vcode);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  resendVcode() {}
}
