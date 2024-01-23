import { Component, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ModalService } from '../../core/services/modal.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  private modalService = inject(ModalService);
  private authService = inject(AuthService);

  public sidebarItems = [
    { label: 'Invitaciones', icon: 'label', url: './invitations' },
    { label: 'Añadir', icon: 'add', url: './new-invitation' },
    // { label: 'Buscar', icon: 'search', url: './search' },
  ];

  async logout() {
    const modalRef = this.modalService.confirmModal();
    const loginConfirm = await lastValueFrom(modalRef.afterClosed());

    if (loginConfirm) {
      this.authService.logout();
    }
  }
}
