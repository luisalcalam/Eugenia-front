import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { tap } from 'rxjs';
import { FormUtils } from '../../core/utils/form.utils';
import { InvitationsService } from '../common/services/invitations.service';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-new-invitation',
  templateUrl: './new-invitation.component.html',
  styleUrls: ['./new-invitation.component.scss'],
})
export class NewInvitationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private invitationsService = inject(InvitationsService);
  private messageService = inject(MessageService);
  public minDate: Date;
  public minDueDate: Date;
  public isLoadingResults: boolean;

  constructor() {
    this.minDate = new Date();
    this.minDueDate = new Date();
    this.isLoadingResults = false;
  }
  ngOnInit(): void {
    this.invitationForm
      .get('invitationDate')
      ?.valueChanges.pipe(
        distinctUntilChanged(),
        tap((date: Date | null) => {
          if (!date) {
            this.minDueDate = new Date();
          } else {
            this.minDueDate = date;
          }
        })
      )
      .subscribe();
  }

  public invitationForm: FormGroup = this.fb.group({
    guestName: ['', [Validators.required]],
    invitationDate: new FormControl<Date | null>(null, [Validators.required]),
    dueDate: new FormControl<Date | null>(null, [Validators.required]),
  });

  create() {
    if (this.invitationForm.invalid) {
      FormUtils.checkAndUpdateForm(this.invitationForm);
      return;
    }
    this.isLoadingResults = true;
    this.invitationsService
      .createInvitation(this.invitationForm.getRawValue())
      .subscribe({
        next: () => {
          this.messageService.successMessage();
        },
        complete: () => {
          this.isLoadingResults = false;
          this.router.navigateByUrl('/dashboard/invitations');
        },
      });
  }
}
