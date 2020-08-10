import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Email } from '../../models/email';
import { Location } from '@angular/common';
import {EmailService} from '../../services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  @Input() email: Email;

  @Output() remove = new EventEmitter();
  @Output() seen = new EventEmitter();

  isSeen: boolean;

  constructor(private _location: Location ) {
  }

  ngOnInit(): void {
    this.isSeen = this.email.seen;

  }

  public onRemove() {
    this.remove.emit(this.email.emailId);
  }

  public onSeen() {
    this.seen.emit(this.email)
    this.isSeen = !this.isSeen;
  }


}
