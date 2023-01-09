import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css', './../shared/styles.css'],
})
export class CompleteProfileComponent implements OnInit {
  completeProfileForm: FormGroup = new FormGroup({});
  maxDate = new Date();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.completeProfileForm = new FormGroup({
      gender: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.completeProfileForm.invalid) {
      return;
    }

    const gender = this.completeProfileForm.value.gender;
    const dob = new Date(
      this.completeProfileForm.value.dateOfBirth
    ).toLocaleDateString();

    this.authService.completeProfile(gender, dob);
  }
}
