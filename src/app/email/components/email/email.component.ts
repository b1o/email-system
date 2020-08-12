import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Email} from "../../models/email";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  @Input() email: Email;
  @Input() type: string;

  @Output() remove = new EventEmitter();
  @Output() read = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onRemove(){
    this.remove.emit(this.email.emailId);
  }

  public onRead(){
    this.email.seen = !this.email.seen;
    this.read.emit(this.email);
  }

}
