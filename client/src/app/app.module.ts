import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScaffoldComponent } from './components/misc/scaffold/scaffold.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './modules/material/material.module';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FeedComponent } from './components/home/feed/feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { CompleteProfileComponent } from './components/auth/complete-profile/complete-profile.component';
import { MatNativeDateModule } from '@angular/material/core';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleComponent } from './components/auth/google/google.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NotFoundComponent } from './components/misc/not-found/not-found.component';
import { ProfileHomeComponent } from './components/user/profile-home/profile-home.component';
import { PostModalComponent } from './components/post/post-modal/post-modal.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { EditProfileComponent } from './components/user/settings/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/user/settings/change-password/change-password.component';
import { PrivacySecurityComponent } from './components/user/settings/privacy-security/privacy-security.component';
import { DiscordComponent } from './components/auth/discord/discord.component';
import { DisconnectDiscordModalComponent } from './components/auth/discord/disconnect-discord-modal/disconnect-discord-modal.component';
import { LoadingModalComponent } from './components/misc/loading-modal/loading-modal.component';
import { StatusCardComponent } from './components/admin/dashboard/status-card/status-card.component';
import { UsersComponent } from './components/admin/users/users.component';
import { PostComponent } from './components/post/post/post.component';
import { DatatableComponent } from './components/admin/datatable/datatable.component';
import { PostsComponent } from './components/admin/reports/posts/posts.component';
import { TwoFactorModalComponent } from './components/user/settings/privacy-security/two-factor-modal/two-factor-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ScaffoldComponent,
    LoginComponent,
    SignupComponent,
    FeedComponent,
    VerifyEmailComponent,
    CompleteProfileComponent,
    GoogleComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    NotFoundComponent,
    ProfileHomeComponent,
    PostModalComponent,
    SettingsComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    PrivacySecurityComponent,
    DiscordComponent,
    DisconnectDiscordModalComponent,
    LoadingModalComponent,
    StatusCardComponent,
    UsersComponent,
    PostComponent,
    DatatableComponent,
    PostsComponent,
    TwoFactorModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    SocialLoginModule,
    FormsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '72244162417-815i1q0n7nh3i50n0c1c2tfv4taimvl9.apps.googleusercontent.com',
              { oneTapEnabled: false }
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
