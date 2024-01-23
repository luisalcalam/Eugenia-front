import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import {
  CreateInvitationReq,
  InvitationResponse,
} from '../interfaces/invitations.interface';

@Injectable({
  providedIn: 'root',
})
export class InvitationsService {
  private apiService = inject(ApiService);

  constructor() {}

  createInvitation(data: CreateInvitationReq) {
    return this.apiService.post<InvitationResponse>('invitations', data);
  }
}
