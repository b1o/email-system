import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  public registerForm: FormGroup;
  public loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.auth
        .register(this.registerForm.value)
        .subscribe((data) => (this.loading = false));
    }
  }

  ngOnInit(): void {}
}
