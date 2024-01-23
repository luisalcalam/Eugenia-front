import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { httpUtils } from '../../core/utils/http.utils';
import { InvitationResponse } from '../common/interfaces/invitations.interface';
import { InvitationsService } from '../common/services/invitations.service';
import { FormUtils } from '../../core/utils/form.utils';
import { MessageService } from '../../core/services/message.service';
import { ModalService } from '../../core/services/modal.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-invitation',
  templateUrl: './edit-invitation.component.html',
  styleUrls: ['./edit-invitation.component.scss'],
})
export class EditInvitationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private invitationsService = inject(InvitationsService);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private modalService = inject(ModalService);

  invitation!: InvitationResponse;
  invitationForm: FormGroup = new FormGroup({});
  urlParam: string | null = null;
  public minDate: Date;
  public minDueDate: Date;
  public isLoadingResults: boolean;
  public qrCodeText: string = '';

  constructor() {
    this.minDate = new Date();
    this.minDueDate = new Date();
    this.isLoadingResults = false;
  }

  ngOnInit(): void {
    this.urlParam = this.activatedRoute.snapshot.paramMap.get('param');
    this.invitation = httpUtils.getStateFromRouteChange();
    this.setForm();
    if (!this.invitation) {
      this.invitationsService
        .getInitationById(this.urlParam as string)
        .subscribe({
          next: (res) => {
            this.invitation = res;
            this.initialSet();
          },
        });
    } else {
      this.initialSet();
    }
  }

  setForm() {
    this.invitationForm = this.fb.group({
      guestName: ['', [Validators.required]],
      invitationDate: new FormControl<Date | null>(null, [Validators.required]),
      dueDate: new FormControl<Date | null>(null, [Validators.required]),
    });
  }

  initialSet() {
    this.invitationForm.reset({ ...this.invitation });
    this.qrCodeText = JSON.stringify(this.invitationForm.getRawValue());
  }

  saveInvitation() {
    if (this.invitationForm.invalid) {
      FormUtils.checkAndUpdateForm(this.invitationForm);
      return;
    }
    this.isLoadingResults = true;
    this.invitationsService
      .updateInvitation(this.invitationForm.getRawValue(), this.invitation.id)
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

  changesDetected() {
    if (this.invitationForm.value && this.invitation) {
      let formValues = this.invitationForm?.value;
      return (
        this.invitation.guestName !== formValues.guestName ||
        this.invitation.invitationDate !== formValues.invitationDate ||
        this.invitation.dueDate !== formValues.dueDate
      );
    } else {
      return false;
    }
  }

  cancelChanges() {
    this.invitationForm.reset({ ...this.invitation });
  }

  async delete() {
    const modalRef = this.modalService.confirmModal();
    const deleteConfirm = await lastValueFrom(modalRef.afterClosed());

    if (deleteConfirm) {
      this.isLoadingResults = true;
      this.invitationsService.deleteInvitation(this.invitation.id).subscribe({
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
}
