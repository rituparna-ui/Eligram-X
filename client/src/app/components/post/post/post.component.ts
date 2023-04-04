import { Component, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {}
  menuTopLeftPosition = { x: '0', y: '0' };
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger?: MatMenuTrigger;

  @Input() post: Post = {
    _id: '',
    author: '',
    caption: '',
    createdAt: '',
    photos: [],
  };

  likePost() {
    this.postService.likePost(this.post._id);
  }

  openContextMenu(event: MouseEvent, data: { _id: string }) {
    event.preventDefault();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger!.menuData = { item: data._id };
    // console.log(this.matMenuTrigger?.menuData);

    this.matMenuTrigger?.openMenu();
  }
  reportPost(id: any) {
    // console.log(id);
    // this.postService.reportPost(id)
    this.postService.reportPost(id).subscribe(() => {
      this.snackBar.open('Post Reported to Admins', '', { duration: 1500 });
    });
  }
}
