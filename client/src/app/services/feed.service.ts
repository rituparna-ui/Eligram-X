import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  readonly API = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getUserFeed() {
    return this.http.get<{ message: string; feed: Post[] }>(
      this.API + '/posts/feed'
    );
  }
}
