import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({});
  showPassword = false;
  showConfirmPassword = false;

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        this.confirmPasswordValidator(),
      ]),
    });
  }
  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    const form: {
      oldPassword: string;
      password: string;
      confirmPassword: string;
    } = this.changePasswordForm.value;
    // this.authService.signUp(form);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.changePasswordForm.value.password != control.value) {
        return { passwordMatch: true };
      } else {
        return null;
      }
    };
  }
}
