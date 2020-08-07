import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmailService} from "../../services/email.service";
import {Email} from "../../models/email";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss']
})
export class EditEmailComponent implements OnInit {
  public emailID;
  public email: Email;
  public editForm: FormGroup;
  public emailToInput: FormControl;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private activatedRoute: ActivatedRoute,
              private emailService: EmailService,
              private fb: FormBuilder,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.emailID = params.get('id');
    })
    this.email = this.emailService.getEmailById(this.emailID);
    console.log(this.email);
    this.emailToInput = this.fb.control('');

    this.editForm = this.fb.group({
      to: [this.email.to],
      subject: this.email.subject,
      content: this.email.content
    })
  }

  get to() {
    return this.editForm.get('to');
  }

  onEmailRemoved(email){
    this.to.setValue(this.to.value.filter(e => e != email));
  }

  addEmailUser(event){
    console.log(event);
    this.to.setValue([...this.to.value, event.value]);
    this.emailToInput.reset();
  }

  editEmail(){
    this.emailService.updateEmail(this.emailID, this.editForm.value)
    this.router.navigateByUrl('emails');
  }

  goBack(){
    this.router.navigateByUrl('emails');
  }

  ngOnInit(): void {
  }

}
