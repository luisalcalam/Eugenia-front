export interface CreateInvitationReq {
  guestName: string;
  invitationDate: Date;
  dueDate: Date;
}
export interface UpdateInvitationReq {
  guestName?: string;
  invitationDate?: Date;
  dueDate?: Date;
}

export interface InvitationResponse {
  id: string;
  guestName: string;
  invitationDate: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}
