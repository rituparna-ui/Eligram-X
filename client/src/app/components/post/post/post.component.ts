import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  constructor(private postService: PostService) {}
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
  }
}
