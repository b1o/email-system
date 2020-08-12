import { createAction, props } from '@ngrx/store';
import { Email } from '../models/email';

export const GetEmails = createAction(
  '[Emails] Get Emails',
  props<{ emailCount: number }>()
);
export const GetSentEmails = createAction(
  '[Emails] Get Sent Emails',
  props<{ emailCount: number }>()
);

export const CreateEmail = createAction(
  '[Emails] Create Email',
  props<{ email: Email }>()
);

export const DeleteEmail = createAction(
  '[Emails] Delete email',
  props<{ emailId: number | string, sent: boolean }>()
);
