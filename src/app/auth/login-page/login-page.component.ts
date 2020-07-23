import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(){
    if (this.loginForm.valid){
      this.loading = true;
      this.auth
        .login(this.loginForm.value)
        .subscribe(data => this.loading = false);
    }
    else {
      console.error('Invalid form!');
    }
  }

  ngOnInit(): void {
  }

}
