import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public registerForm: FormGroup;
  public loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.auth.currentUser) {
      this.router.navigateByUrl('/emails')
    }
  }

  onRegister(){
    if (this.registerForm.valid){
      this.loading = true;
      this.auth
        .register(this.registerForm.value)
        .subscribe(data => {
          this.loading = false;
          this.router.navigateByUrl('/emails');
        }, err => this.loading = false);
    }
  }

  ngOnInit(): void {
  }

}
