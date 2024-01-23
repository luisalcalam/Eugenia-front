import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvitationComponent } from './edit-invitation.component';

describe('EditInvitationComponent', () => {
  let component: EditInvitationComponent;
  let fixture: ComponentFixture<EditInvitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInvitationComponent]
    });
    fixture = TestBed.createComponent(EditInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
