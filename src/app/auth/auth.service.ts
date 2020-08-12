import { Injectable } from '@angular/core';
import {LoginDTO} from "./models/loginDTO";
import {RegisterDTO} from "./models/registerDTO";
import {of} from "rxjs";
import {catchError, delay, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../users/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backend = 'http://localhost:3000/';

  public userTestData = {
    username: 'gosho',
    email: 'gosho@mail.bg'
  }

  public currentUser: User;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    if (localStorage.getItem('user')) {
      this.currentUser = JSON.parse(localStorage.getItem('user')) as User;

    }
  }

  public checkServerAuth() {
    return this.http.get(this.backend + 'users/current')
  }

  public login(dto: LoginDTO){
    return this.http.post<User>(this.backend + 'auth/login', dto).pipe(
      tap(user => this.setUser(user)),
      catchError((err, caught) => {
        this.snackBar.open(err.error.error, 'OK', {duration:3000})
        return of(err);
      }))
  }

  public register(dto: RegisterDTO){
    return this.http.post<User>(this.backend + 'auth/register', dto).pipe(
      tap(user => this.setUser(user)),
      catchError (err => {
        this.snackBar.open(err.error.error, 'OK', {duration: 3000});
        return of(err);
      }))
  }

  public logout(){
    return this.http
      .post(this.backend + 'auth/logout', {userId: this.currentUser.id})
      .pipe(tap(() => {
        (this.currentUser = null);
        localStorage.removeItem('user')
      }));
  }

  public getCurrentUser(userId){
    return this.http.post(this.backend + 'users/current', {userId});
  }

  public setUser(user){
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }
}
