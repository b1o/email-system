import { Component, OnInit } from '@angular/core';
import {Email} from "../../email/models/email";
import {getRandomNumber} from "../../helpers";
import {EmailService} from "../../email/services/email.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-email-list-page',
  templateUrl: './email-list-page.component.html',
  styleUrls: ['./email-list-page.component.scss']
})
export class EmailListPageComponent implements OnInit {
  public emails = [];
  public sentEmails = [];

  constructor(public emailService: EmailService, private router: Router) {  }

  ngOnInit(): void {
    this.emailService.getEmails().subscribe((emails) => (this.emails = emails));

    this.emailService
      .getSentEmails()
      .subscribe((sentEmails) => (this.sentEmails = sentEmails));
  }

  public onEmailRemove(emailId){
    this.emailService.deleteEmail(emailId).subscribe((_) => {
      this.ngOnInit();
    });
  }

  public onEmailRead(email: Email){
    this.emailService.updateEmail(email.emailId, email)
      .subscribe(data => {
        this.router.navigateByUrl('emails');
      });
  }
}
