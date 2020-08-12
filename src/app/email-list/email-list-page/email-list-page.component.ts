import { Component, OnInit } from '@angular/core';
import { Email } from '../../email/models/email';
import { getRandomNumber } from 'src/app/helpers';
import { EmailService } from '../../email/services/email.service';
import { Store } from '@ngrx/store';

import * as EmailActions from '../../email/actions/email.actions';
import { EmailsState } from 'src/app/email/reducers/email-reducer';

@Component({
  selector: 'app-email-list-page',
  templateUrl: './email-list-page.component.html',
  styleUrls: ['./email-list-page.component.scss'],
})
export class EmailListPageComponent implements OnInit {
  public emails = [];
  public sentEmails = [];

  constructor(public emailService: EmailService, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select((state: any) => state.emails)
      .subscribe((data) => {
        this.emails = data.emails;
        this.sentEmails = data.sentEmails;
      });

    this.store.dispatch(EmailActions.GetEmails({ emailCount: 3 }));
    this.store.dispatch(EmailActions.GetSentEmails({ emailCount: 5 }));

    // this.emailService.getEmails().subscribe((emails) => (this.emails = emails));

    // this.emailService
    //   .getSentEmails()
    //   .subscribe((sentEmails) => (this.sentEmails = sentEmails));
  }

  public onEmailRemove(emailId, sent?) {
    this.store.dispatch(EmailActions.DeleteEmail({ emailId, sent }));
    // this.emailService.deleteEmail(emailId);
  }

  public onEmailSeen(email: Email) {
    this.emailService.updateEmail(email.emailId, { seen: true });
  }
}
