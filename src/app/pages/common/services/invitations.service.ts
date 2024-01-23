import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { UpdateInvitationReq } from '../interfaces/invitations.interface';
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

  getInitationById(id: string) {
    return this.apiService.getOne<InvitationResponse>(`invitations/${id}`);
  }

  updateInvitation(data: UpdateInvitationReq, id: string) {
    return this.apiService.patch(`invitations/${id}`, data);
  }

  deleteInvitation(id: string) {
    return this.apiService.delete(`invitations/${id}`);
  }
}
