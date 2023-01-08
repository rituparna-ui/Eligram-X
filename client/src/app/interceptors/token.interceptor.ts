import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.getAuthStatus()) {
      const modifiedRequest = request.clone({
        headers: request.headers.append(
          'Authorization',
          this.authService.getToken()
        ),
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
