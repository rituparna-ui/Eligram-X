import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly API = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  createPost(formData: FormData) {
    return this.http.post(this.API + '/posts', formData);
  }
}
