import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from "rxjs";
import {Email} from "../models/email";
import {delay, map, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private backend = 'http://localhost:3000/';
  // private EMAIL_COUNT = 10;

  private emails$: BehaviorSubject<Email[]> = new BehaviorSubject([]);

  private emailData: Email[] = [];

  constructor(private http: HttpClient) {
    this.setEmails();
  }

  private setEmails() {
    // for (let i = 0; i < this.EMAIL_COUNT; i++){
    //   this.emailData.push(createTestEmail());
    // }
    // this.emails$.next(this.emailData);
    //TODO setEmails
    // this.getEmails().subscribe(emails => {
    //   this.emailData = emails;
    //   console.log('in set emails!');
    //   console.log(this.emailData);
    // });
  }

  public getEmails(){
    return this.http.get<Email[]>(this.backend + 'emails');
  }

  public getSentEmails() {
    return this.http.get<Email[]>(this.backend + 'emails/sent')
      .pipe(tap(data => {
        this.emailData = data;
        this.emails$.next(this.emailData);
      }));
  }

  public getEmailById(emailId){
    return of(this.emailData.find((e) => e.emailId == emailId))
      .pipe(delay(1000));
  }

  public addEmail(email: Email){
    // const id = Math.random();
    // this.emailData.unshift({...email, id, seen: false});
    // this.emails$.next(this.emailData);
    return this.http.post(this.backend + 'emails/create', email)
  }

  public deleteEmail(emailId){
    // this.emailData = this.emailData.filter(e => e.id != emailId);
    // this.emails$.next(this.emailData);
    return this.http.post(this.backend + 'emails/delete', {emailId});
  }

  public newEmails() {
    return this.emails$.pipe(
      map(e => e.filter(email => !email.seen))
    )
  }

  public updateEmail(emailId, changes: Email) {
    const body = {emailId, changes};

    return this.http.post<Email[]>(this.backend + 'emails/update', body)
      .pipe(tap(res => {
        this.emailData = this.emailData.map(email => {
          if (emailId == email.emailId) {
            return {...email, ...changes}
          }
          return email;
        })
        this.emails$.next(this.emailData);
      }))
  }

}
