import axios from 'axios';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css'],
})
export class PostModalComponent implements OnInit {
  createPostForm: FormGroup = new FormGroup({});
  photos: any = [];
  isLoading = false;
  progress = 0;
  mode: ProgressBarMode = 'determinate';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<PostModalComponent>
  ) {}

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      caption: new FormControl(null, [Validators.required]),
      photos: new FormControl(null),
    });
  }

  onFilePick(e: Event) {
    this.photos = [];
    const files = (e.target as HTMLInputElement).files || [];
    for (let i = 0; i < files.length; i++) {
      this.photos.push(files[i]);
    }
  }

  onSubmit() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('caption', this.createPostForm.value.caption);
    for (var i = 0; i < this.photos.length; i++) {
      formData.append('photos', this.photos[i]);
    }
    axios
      .post('http://localhost:3000/api/posts', formData, {
        onUploadProgress: (progress) => {
          if (progress.progress) {
            this.progress = progress.progress * 100;
          }
          if (progress.progress == 1) {
            this.mode = 'indeterminate';
          }
        },
        headers: {
          Authorization: this.authService.getToken(),
        },
      })
      .then((result) => {
        this.isLoading = false;
        this.dialogRef.close(result.data);
      })
      .catch((err) => {
        this.dialogRef.close();
      });
  }
}
