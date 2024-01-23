import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvitationComponent } from './new-invitation.component';

describe('NewInvitationComponent', () => {
  let component: NewInvitationComponent;
  let fixture: ComponentFixture<NewInvitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInvitationComponent]
    });
    fixture = TestBed.createComponent(NewInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
