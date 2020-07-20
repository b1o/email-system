import { Component, OnInit } from '@angular/core';
import { Email, createTestEmail } from '../../email/models/email';
import { getRandomNumber } from 'src/app/helpers';

@Component({
  selector: 'app-email-list-page',
  templateUrl: './email-list-page.component.html',
  styleUrls: ['./email-list-page.component.scss'],
})
export class EmailListPageComponent implements OnInit {
  public emails: Email[] = [];

  constructor() {
    for (let i = 0; i < getRandomNumber(1, 10); i++) {
      this.emails.push(createTestEmail());
    }
  }

  ngOnInit(): void {}
}
