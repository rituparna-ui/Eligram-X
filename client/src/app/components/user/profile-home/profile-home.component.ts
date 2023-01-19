import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { UserServiceUser } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css'],
})
export class ProfileHomeComponent implements OnInit {
  user?: UserServiceUser;
  posts: Post[] = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.userService
      .fetchUserByUsername(this.route.snapshot.params['username'])
      .subscribe({
        next: (user) => {
          this.user = user;
        },
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });
    this.postService
      .fetchAllUserPosts(this.route.snapshot.params['username'])
      .subscribe((data) => {
        this.posts = data.posts;
      });
  }
  onCoverClick(_id: string, index: number) {
    console.log('post clicked ' + _id + ' at id ' + index);
    console.log(
      'there are ' +
        this.posts[index].photos.length +
        ' more photos at this index'
    );
    console.log(this.posts[index].photos);
  }
}
