import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../../models/email';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  @Input() email: Email;

  constructor() {}

  ngOnInit(): void {}
}
