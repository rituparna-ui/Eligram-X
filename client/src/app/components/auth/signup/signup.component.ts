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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', './../shared/styles.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        this.confirmPasswordValidator(),
      ]),
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    console.log(this.signupForm.value);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.signupForm.value.password != control.value) {
        return { passwordMatch: true };
      } else {
        return null;
      }
    };
  }
}
