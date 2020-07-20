import { Injectable } from '@angular/core';
import { LoginDTO } from './models/loginDTO';
import { RegisterDTO } from './models/registerDTO';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userTestData = {
    username: 'gosho',
    email: 'gossho@mail.com',
  };

  constructor() {}

  public login(dto: LoginDTO) {
    return of(this.userTestData).pipe(delay(1000));
  }

  public register(dto: RegisterDTO) {
    return of(this.userTestData).pipe(delay(1000));
  }
}
