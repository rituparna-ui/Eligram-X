import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserServiceUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  readonly API = 'http://localhost:3000/api';
  private user: UserServiceUser = {
    _id: '',
    email: '',
    firstName: '',
    gender: '',
    lastName: '',
    role: '',
    state: 0,
    username: '',
    profilePicture: '',
    dateOfBirth: { date: 0, month: 0, year: 0 },
  };
  private userNotifier: Subject<UserServiceUser> =
    new Subject<UserServiceUser>();

  getUser() {
    return this.user;
  }

  getUserNotifier() {
    return this.userNotifier.asObservable();
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchCurrentUser(id: string) {
    this.http
      .get<UserServiceUser>(this.API + '/users/id/' + id)
      .subscribe((user) => {
        this.user = user;
        this.userNotifier.next(user);
      });
  }

  fetchUserByUsername(username: string) {
    return this.http.get<UserServiceUser>(this.API + '/users/u/' + username);
  }

  fetchUserById(id: string) {
    return this.http.get<UserServiceUser>(this.API + '/users/id/' + id);
  }
}
