import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService: AuthService;

  constructor(injector: Injector, private router: Router) {
    this.authService = injector.get(AuthService);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    if (this.authService.currentUser) {
      const authRequest = request.clone({
        headers: request.headers.set('User', this.authService.currentUser.id),
      });

      return next.handle(authRequest).pipe(
        catchError((err) => {
          console.log('http error', err);

          if (err.status == 401) {
            this.router.navigateByUrl('/auth/login');
          }
          return of(err);
        })
      );
    }
    return next.handle(request);
  }
}
