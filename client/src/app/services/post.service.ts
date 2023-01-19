import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly API = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  // createPost(formData: FormData) {
  //   return this.http.post(this.API + '/posts', formData);
  // }

  fetchAllUserPosts(username: string) {
    return this.http.get<{
      message: string;
      posts: Post[];
    }>(this.API + '/posts/u/' + username);
  }
}
