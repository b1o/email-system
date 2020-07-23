import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Email } from '../../models/email';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  @Input() email: Email;

  @Output() remove = new EventEmitter();
  @Output() seen = new EventEmitter();
  @Output() edit = new EventEmitter();

  public canEditEmail = false

  constructor() {}

  ngOnInit(): void { }

  public onRemove() {
    this.remove.emit(this.email.id);
  }

  public onSeen() {
    this.seen.emit(this.email)
  }

  public onEdit() {
    this.edit.emit(this.email.id);
    this.canEditEmail = true;
  }

  public onSave() {
    this.canEditEmail = false;
  }

}
