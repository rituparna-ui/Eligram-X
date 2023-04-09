import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-two-factor-modal',
  templateUrl: './two-factor-modal.component.html',
  styleUrls: ['./two-factor-modal.component.css'],
})
export class TwoFactorModalComponent {
  otp: number = 0;
  constructor(
    private dialogRef: MatDialogRef<TwoFactorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public url: string
  ) {}

  passOtp() {
    this.dialogRef.close({ otp: this.otp });
  }
}
