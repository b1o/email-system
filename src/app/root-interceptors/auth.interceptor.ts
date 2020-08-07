import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.currentUser) {
      const authRequest = request.clone(
        {headers: request.headers.set('User', this.authService.currentUser.id)}
      );
      authRequest.headers.append('User', this.authService.currentUser.id);
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
