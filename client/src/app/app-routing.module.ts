import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FeedComponent } from './components/home/feed/feed.component';

const routes: Routes = [
  { path: '', component: FeedComponent },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
