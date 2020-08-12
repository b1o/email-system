import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmailService} from "../../services/email.service";
import {Email} from "../../models/email";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Location} from "@angular/common";
import {User} from "../../../users/models/user";
import {UsersService} from "../../../users/services/users.service";

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss']
})
export class EditEmailComponent implements OnInit {
  public emailId;
  public email;
  public emailEditData;
  public editForm: FormGroup;
  public emailToInput: FormControl;
  public loading = false;
  public isEditing = false;
  public users: User[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private activatedRoute: ActivatedRoute,
              private emailService: EmailService,
              private userService: UsersService,
              private fb: FormBuilder,
              private router: Router) {
    this.emailToInput = this.fb.control('');
    this.editForm = this.fb.group({
      to: [],
      subject: "",
      content: ""
    })
    this.activatedRoute.paramMap.subscribe(params => {
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
          this.editForm.patchValue(emailData);
          this.loading = false;
        });
      }
    })
    this.userService.getAllUsers()
      .subscribe(users => this.users = users);
  }


  get to() {
    return this.editForm.get('to');
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

  editEmail(){
    console.log(this.editForm.value);
    this.emailService.updateEmail(this.emailId, this.editForm.value)
      .subscribe(data => {
        this.router.navigateByUrl('emails');
      })
  }

  goBack(){
    this.router.navigateByUrl('emails');
  }

  ngOnInit(): void {}

}
