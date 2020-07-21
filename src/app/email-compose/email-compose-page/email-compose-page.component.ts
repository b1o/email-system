import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-compose-page',
  templateUrl: './email-compose-page.component.html',
  styleUrls: ['./email-compose-page.component.scss']
})
export class EmailComposePageComponent implements OnInit {
  emailText: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSend() {
    console.log(this.emailText);
  }
}
