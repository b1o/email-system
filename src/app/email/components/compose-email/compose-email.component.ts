import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.scss']
})
export class ComposeEmailComponent implements OnInit {

  from: string;
  to: string[];
  subject: string;
  content: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSend() {
    console.log('from: ' + this.from);
    console.log('to: ' + this.to);
    console.log('subject: ' + this.subject);
    console.log('content: ' + this.content);

    // possibly integrate a network service and initiate a post request through it to the backend...
  }
}
