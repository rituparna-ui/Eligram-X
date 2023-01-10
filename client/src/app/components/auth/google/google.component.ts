import { Component, OnDestroy, OnInit } from '@angular/core';

import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css'],
})
export class GoogleComponent implements OnInit, OnDestroy {
  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {}
  socialSubscription: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.socialSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.socialSubscription = this.socialAuthService.authState.subscribe(
      (user) => {
        if (user) {
          this.authService.signInWithGoogle(user.idToken);
          this.socialAuthService.signOut();
        }
      }
    );
  }
}
