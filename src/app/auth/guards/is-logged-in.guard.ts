import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.currentUser) {
      console.log('auth success');
      return true;
    }
    else {
      // if (localStorage.getItem('user'){
      //   const userId = localStorage.getItem('user');
      //   return this.authService.getCurrentUser(userId)
      //     .pipe(
      //       map(user => {
      //         this.authService.setUser(user);
      //         return true;
      //       }),
      //     catchError(err => {
      //       this.router.navigateByUrl('/auth/login');
      //     }))
      // }
      console.log('auth failed');
    }
    this.router.navigateByUrl('auth/login');
  }

}
