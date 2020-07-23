import { Component, OnInit } from '@angular/core';
import {createTestEmail, Email} from "../../email/models/email";
import {getRandomNumber} from "../../helpers";
import {EmailService} from "../../email/services/email.service";

@Component({
  selector: 'app-email-list-page',
  templateUrl: './email-list-page.component.html',
  styleUrls: ['./email-list-page.component.scss']
})
export class EmailListPageComponent implements OnInit {
  public emails: Email[] = [];

  constructor(public emailService: EmailService) {  }

  ngOnInit(): void {
  }

  public onEmailRemove(emailId){
    this.emailService.deleteEmail(emailId);
  }

  public onEmailRead(email: Email){
    this.emailService.updateEmail(email.id, email)
  }
}
