import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DatatableComponent } from './components/admin/datatable/datatable.component';
import { PostsComponent } from './components/admin/reports/posts/posts.component';
import { UsersComponent } from './components/admin/users/users.component';
import { CompleteProfileComponent } from './components/auth/complete-profile/complete-profile.component';
import { DiscordComponent } from './components/auth/discord/discord.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { FeedComponent } from './components/home/feed/feed.component';
import { NotFoundComponent } from './components/misc/not-found/not-found.component';
import { ProfileHomeComponent } from './components/user/profile-home/profile-home.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { AdminGuard } from './guards/admin.guard';
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
        path: 'forgot-password',
        component: ForgotPasswordComponent,
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
      {
        path: 'discord',
        component: DiscordComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'users/:filter',
        component: DatatableComponent,
        canActivate: [AuthGuard, AdminGuard],
        // children: [
        //   {
        //     path: 'online',
        //     component: DatatableComponent,
        //     data: { filter: 'online' },
        //   },
        //   {
        //     path: 'idle',
        //     component: DatatableComponent,
        //   },
        //   {
        //     path: 'offline',
        //     component: DatatableComponent,
        //   },
        //   {
        //     path: 'banned',
        //     component: DatatableComponent,
        //   },
        //   {
        //     path: 'admins',
        //     component: DatatableComponent,
        //   },
        //   {
        //     path: 'admin-verified',
        //     component: DatatableComponent,
        //   },
        //   {
        //     path: 'complete',
        //     component: DatatableComponent,
        //   },
        //   {
        //     path: 'verified',
        //     component: DatatableComponent,
        //   },
        //   {
        //     path: 'unverified',
        //     component: DatatableComponent,
        //   },
        // ],
      },
      {
        path: 'reports',
        canActivate: [AuthGuard, AdminGuard],
        children: [
          {
            path: 'posts',
            component: PostsComponent,
          },
        ],
      },
      {
        path: '**',
        redirectTo: '/admin/dashboard',
      },
    ],
  },
  {
    path: 'u/:username',
    component: ProfileHomeComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
