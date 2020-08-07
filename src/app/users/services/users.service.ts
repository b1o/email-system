import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private backend = 'http://localhost:3000/';

  constructor(private network: HttpClient, private authService: AuthService) { }

  public createUser(name: string, age: number, password: string) {
    return this.network.post(this.backend + 'user/create',
      {name, age, password, loggedUser: this.authService.currentUser});
  }

  public getAllUsers() {
    return this.network.get<Array<any>>(this.backend + 'users');
  }
}
