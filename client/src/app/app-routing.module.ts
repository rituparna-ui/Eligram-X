import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteProfileComponent } from './components/auth/complete-profile/complete-profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { FeedComponent } from './components/home/feed/feed.component';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';
import { CompleteProfileGuard } from './guards/complete-profile.guard';
import { VerifyEmailGuard } from './guards/verify-email.guard';

const routes: Routes = [
  { path: '', component: FeedComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent,
        canActivate: [VerifyEmailGuard],
      },
      {
        path: 'complete-profile',
        component: CompleteProfileComponent,
        canActivate: [CompleteProfileGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
