import { Component } from '@angular/core';
import { EmailService } from './email/services/email.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public newEmailsCount = 0;

  constructor(private emailService: EmailService) {
    this.emailService.newEmails()
      .subscribe(emails => this.newEmailsCount = emails.length)
  }

  title = 'email-system';
}
