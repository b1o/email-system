import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Email, toEmail } from '../models/email';
import { map, delay } from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {retagTsFile} from '@angular/compiler-cli/src/ngtsc/shims';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private backend = 'http://localhost:3000/';

  private EMAIL_COUNT = 2;

  public emails$: BehaviorSubject<Email[]> = new BehaviorSubject([]);
  private emailData: Email[] = [];

  constructor(private http: HttpClient) {
    this.setEmails();
  }

  // public updateEmailDataAndEmails(emailsArray: Email[]) {
  //   this.emailData = emailsArray;
  //   this.emails$.next(this.emailData);
  // }

  private setEmails() {
    // for (let i = 0; i < this.EMAIL_COUNT; i++) {
    //   this.emailData.push(createTestEmail());
    // }

    // this.emails$.next(this.emailData);
  }

  public newEmails() {
    // return this.emails$.pipe(map((e) => e.filter((email) => !email.seen)));
    return this.http.get<Email[]>(this.backend + 'emails/new');
  }

  public updateEmail(emailId, changes: Email) {
    const body = {emailId, changes};
    return this.http.post<Email[]>(this.backend + 'emails/update', body);
  }

  public getEmailById(emailId) {
    //return of(this.emailData.find((e) => e.emailId == emailId)).pipe(delay(1000));
    return this.http.post<Email>(this.backend + 'emails/getEmailById', {emailId});

  }

  public getSentEmails() {
    return this.http.get<Email[]>(this.backend + 'emails/sent');
  }

  public addEmail(email: Email) {
    // const id = Math.random();
    // this.emailData.unshift({ ...email, id, seen: false });
    // this.emails$.next(this.emailData);
    return this.http.post(this.backend + 'emails/create', email);
  }

  public getEmails() {
    return this.http.get<Email[]>(this.backend + 'emails');
  }

  public deleteEmail(emailId) {
    // this.emailData = this.emailData.filter((e) => e.emailId != emailId);
    // this.emails$.next(this.emailData);
    const body = {emailId};

    return this.http.post<Email[]>(this.backend + 'emails/delete', body);
  }
}
