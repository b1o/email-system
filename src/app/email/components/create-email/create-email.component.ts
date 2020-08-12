import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {EmailService} from "../../services/email.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Email} from "../../models/email";
import {User} from "../../../users/models/user";
import {UsersService} from "../../../users/services/users.service";

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.scss']
})
export class CreateEmailComponent implements OnInit {
  public emailForm: FormGroup;
  public emailToInput: FormControl;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public emailEditData: Email;
  public loading = false;
  public isEditing = false;
  public emailId;
  public users: User[] = [];

  constructor(private fb: FormBuilder,
              private emailService: EmailService,
              private userService: UsersService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location,) {
    this.emailToInput = this.fb.control('');

    this.emailForm = this.fb.group({
      to: [[]],
      subject: '',
      content: ''
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.isEditing = true;
        this.emailId = params.get('id');
        this.loading = true;

        this.emailService.getEmailById(this.emailId).subscribe((emailData) => {
          this.emailEditData = emailData;
          if (!this.emailEditData) {
            console.error('No such email');
            this.router.navigateByUrl('/emails');
          }
          this.emailForm.patchValue(emailData);
          this.loading = false;
        });
      }
    });

    this.emailToInput = this.fb.control('');
    this.userService.getAllUsers()
      .subscribe(users => this.users = users);
  }

  get to() {
    return this.emailForm.get('to');
  }

  onOptionSelected(event) {
    console.log(event.option.value);
    this.addEmailUser(event.option)
  }

  onEmailRemoved(email){
    this.to.setValue(this.to.value.filter(e => e != email));
  }

  addEmailUser(event){
    console.log(event);
    this.to.setValue([...this.to.value, event.value]);
    this.emailToInput.reset();
  }

  submit(){
    if (this.isEditing) {
      this.emailService.updateEmail(this.emailId, this.emailForm.value);
    }
    else {
      this.emailService.addEmail(this.emailForm.value).subscribe((_) => {
        this.router.navigateByUrl('/emails');
      });
    }
  }

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
  }

}
