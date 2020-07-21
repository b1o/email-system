import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailComposePageComponent } from './email-compose-page.component';

describe('EmailComposePageComponent', () => {
  let component: EmailComposePageComponent;
  let fixture: ComponentFixture<EmailComposePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailComposePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailComposePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
