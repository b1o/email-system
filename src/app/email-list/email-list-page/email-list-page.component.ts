import {Component, OnInit} from '@angular/core';
import {Email} from '../../email/models/email';
import {EmailService} from '../../email/services/email.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-email-list-page',
  templateUrl: './email-list-page.component.html',
  styleUrls: ['./email-list-page.component.scss'],
})
export class EmailListPageComponent implements OnInit {
  public emails = [];
  public sentEmails = [];

  constructor(public emailService: EmailService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.reloadEmails();
  }

  private reloadEmails() {
    this.emailService.getEmails().subscribe((emails) => (this.emails = emails));

    this.emailService
      .getSentEmails()
      .subscribe((sentEmails) => (this.sentEmails = sentEmails));
  }

  public onEmailRemove(emailId) {
    this.emailService.deleteEmail(emailId)
      .subscribe(
        (response) =>
          this.snackbar.open('Successfully deleted this email', 'OK', {duration: 3000} ),
        (error) => console.log(error)
      );
    this.reloadEmails();
  }

  public onEmailSeen(email: Email) {
    this.emailService.updateEmail(email.emailId, {seen: true})
      .subscribe(
        (response) =>
          this.snackbar.open('Successfully marked this email as seen', 'OK', {duration: 3000} ),
        (error) => console.log(error)
      );;
  }
}
