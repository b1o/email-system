import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {EmailService} from './email/services/email.service';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {

  public newEmailsCount = 0;

  constructor(private emailService: EmailService, public authService: AuthService, private router: Router) {

    this.authService.checkServerAuth()
      .subscribe(user => this.authService.setUser(user));

    this.reloadNewEmails();

  }

  title = 'email-system';

  public logout() {
    this.authService.logout()
      .subscribe(res => this.router.navigateByUrl('/auth/login'));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reloadNewEmails();
  }

  private reloadNewEmails() {
    this.emailService.newEmails()
      .subscribe(
        (res) => this.newEmailsCount = res.length
      );
  }
}
