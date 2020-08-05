import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Email, toEmail } from '../models/email';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private backend = 'http://localhost:3000/';

  private EMAIL_COUNT = 2;

  private emails$: BehaviorSubject<Email[]> = new BehaviorSubject([]);
  private emailData: Email[] = [];

  constructor(private http: HttpClient) {
    this.setEmails();
  }

  private setEmails() {
    // for (let i = 0; i < this.EMAIL_COUNT; i++) {
    //   this.emailData.push(createTestEmail());
    // }

    // this.emails$.next(this.emailData);
  }

  public newEmails() {
    return this.emails$.pipe(map((e) => e.filter((email) => !email.seen)));
  }

  public updateEmail(emailId, changes: Email) {
    this.emailData = this.emailData.map((email) => {
      if (email.id == emailId) {
        return { ...email, ...changes };
      }

      return email;
    });

    this.emails$.next(this.emailData);
  }

  public getEmailById(emailId) {
    return of(this.emailData.find((e) => e.id == emailId)).pipe(delay(1000))
  }

  public getSentEmails() {
    return this.http.get<Email[]>(this.backend + 'emails/sent')
  }

  public addEmail(email: Email) {
    // const id = Math.random();
    // this.emailData.unshift({ ...email, id, seen: false });
    // this.emails$.next(this.emailData);
    return this.http.post(this.backend + 'emails/create', email)
  }

  public getEmails() {
    return this.http.get<Email[]>(this.backend + 'emails')
  }

  public deleteEmail(emailId) {
    this.emailData = this.emailData.filter((e) => e.id != emailId);
    this.emails$.next(this.emailData);
  }
}
