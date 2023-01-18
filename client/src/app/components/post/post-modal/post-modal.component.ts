import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css'],
})
export class PostModalComponent implements OnInit {
  createPostForm: FormGroup = new FormGroup({});
  photos: any = [];
  isLoading = false;

  constructor(
    private postService: PostService,
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
    this.postService.createPost(formData).subscribe((data) => {
      this.isLoading = false;
      this.dialogRef.close(data);
    });
  }
}
