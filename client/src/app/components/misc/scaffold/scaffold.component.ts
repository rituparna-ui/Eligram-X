import { Component } from '@angular/core';

@Component({
  selector: 'app-scaffold',
  templateUrl: './scaffold.component.html',
  styleUrls: ['./scaffold.component.css'],
})
export class ScaffoldComponent {
  routes = [
    { name: 'Log In', route: '/auth/login' },
    { name: 'Sign Up', route: '/about/signup' },
  ];
  constructor() {}
}
