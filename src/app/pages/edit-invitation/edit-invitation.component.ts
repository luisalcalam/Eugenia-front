import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { httpUtils } from '../../core/utils/http.utils';
import { InvitationResponse } from '../common/interfaces/invitations.interface';

@Component({
  selector: 'app-edit-invitation',
  templateUrl: './edit-invitation.component.html',
  styleUrls: ['./edit-invitation.component.scss'],
})
export class EditInvitationComponent implements OnInit {
  private fb = inject(FormBuilder);
  invitation!: InvitationResponse;
  public minDate: Date;
  public minDueDate: Date;
  public isLoadingResults: boolean;

  constructor() {
    this.minDate = new Date();
    this.minDueDate = new Date();
    this.isLoadingResults = false;
  }

  ngOnInit(): void {
    this.invitation = httpUtils.getStateFromRouteChange();
    console.log(this.invitation);
  }

  public invitationForm: FormGroup = this.fb.group({
    guestName: ['', [Validators.required]],
    invitationDate: new FormControl<Date | null>(null, [Validators.required]),
    dueDate: new FormControl<Date | null>(null, [Validators.required]),
  });
}
