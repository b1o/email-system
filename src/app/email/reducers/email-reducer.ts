import { createReducer, Action, on } from '@ngrx/store';
import { Email, createTestEmail } from '../models/email';

import * as EmailActions from '../actions/email.actions';

export interface EmailsState {
  emails: Email[];
  sentEmails: Email[];
}

export const initialState: EmailsState = {
  emails: [],
  sentEmails: [],
};

const scoreboardReducer = createReducer(
  initialState,
  on(EmailActions.GetEmails, (state, { emailCount }) => {
    console.log('get emails action');

    return {
      ...state,
      emails: Array(emailCount || 5)
        .fill(0)
        .map(() => createTestEmail()),
    };
  }),

  on(EmailActions.GetSentEmails, (state, { emailCount }) => {
    return {
      ...state,
      sentEmails: Array(emailCount || 5)
        .fill(0)
        .map(() => createTestEmail()),
    };
  }),

  on(EmailActions.DeleteEmail, (state, { emailId, sent }) => {
    if (sent) {
      return {
        ...state,
        sentEmails: state.sentEmails.filter(e => e.emailId != emailId)
      }
    } else {
      return {
        ...state,
        emails: state.sentEmails.filter(e => e.emailId != emailId)
      }
    }
  })
);

export function reducer(state: EmailsState | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
