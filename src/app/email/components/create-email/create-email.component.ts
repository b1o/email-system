import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { EmailService } from '../../services/email.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Email } from '../../models/email';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/users/services/users.service';
import { User } from 'src/app/users/models/user';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.scss'],
})
export class CreateEmailComponent implements OnInit {
  public emailForm: FormGroup;
  public emailToInput: FormControl;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public isEditing = false;
  public emailId;
  public emailEditData: Email;
  public loading = false;

  public users: User[]  = []

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private userService: UsersService
  ) {
    this.emailForm = this.fb.group({
      to: [[], Validators.required],
      subject: '',
      content: '',
    });

    this.route.paramMap.subscribe((params) => {
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

  ngOnInit(): void {}

  get to() {
    return this.emailForm.get('to');
  }

  onOptionSelected(event) {
    console.log(event.option.value);
    this.addEmailUser(event.option)
  }

  onEmailRemoved(email) {
    this.to.setValue(this.to.value.filter((e) => e != email));
  }

  addEmailUser(event) {
    console.log(this.to);
    this.emailForm.get('to').setValue([...this.to.value, event.value]);
    this.emailToInput.reset();
  }

  pure(num) {
    return num * 2;
  }

  submit() {
    if (this.isEditing) {
      this.emailService.updateEmail(this.emailId, this.emailForm.value);
    } else {
      this.emailService.addEmail(this.emailForm.value).subscribe((_) => {
        this.router.navigateByUrl('/emails');
      });
    }
  }

  public goBack() {
    this._location.back();
  }
}
