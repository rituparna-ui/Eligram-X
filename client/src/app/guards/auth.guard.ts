import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('auth guard called');
    const user = this.authService.getUser();
    if (user.state == 0) {
      return true;
    }
    if (user.state == 1) {
      this.router.navigate(['/auth', 'complete-profile']);
      return false;
    }
    if (user.state == 2) {
      this.router.navigate(['/auth', 'verify-email']);
      return false;
    }
    return false;
  }
}
