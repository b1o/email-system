import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {EmailService} from "../../services/email.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.scss']
})
export class CreateEmailComponent implements OnInit {
  public emailForm: FormGroup;
  public emailToInput: FormControl;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder,
              private emailService: EmailService,
              private router: Router,
              private location: Location) {
    this.emailToInput = this.fb.control('');

    this.emailForm = this.fb.group({
      to: [[]],
      subject: '',
      content: ''
    })
  }

  get to() {
    return this.emailForm.get('to');
  }

  onEmailRemoved(email){
    this.to.setValue(this.to.value.filter(e => e != email));
  }

  addEmailUser(event){
    console.log(event);
    this.to.setValue([...this.to.value, event.value]);
    this.emailToInput.reset();
  }

  sendEmail(){
    this.emailService.addEmail(this.emailForm.value);
    this.router.navigateByUrl('emails');
  }

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
  }

}
