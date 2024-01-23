import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  DataTableImplementation,
  DataFieldTypeEnum,
} from '../../shared/components/data-table/interfaces/dataTable.interface';
import { InvitationResponse } from '../common/interfaces/invitations.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private router = inject(Router);

  tableImplementation: DataTableImplementation = {
    path: 'invitations',
    addButton: true,
    fields: [
      {
        name: 'Invitado',
        tableValue: 'guestName',
        fieldType: DataFieldTypeEnum.text,
      },
      {
        name: 'Fecha de invitación',
        tableValue: 'invitationDate',
        fieldType: DataFieldTypeEnum.date,
      },
      {
        name: 'Fecha de vencimiento',
        tableValue: 'dueDate',
        fieldType: DataFieldTypeEnum.date,
      },
    ],
  };

  rowClick($event: InvitationResponse) {
    this.router.navigate(['/dashboard/edit-invitation/', $event.id], {
      state: { data: $event },
    });
  }

  addClick() {
    this.router.navigateByUrl('/dashboard/new-invitation');
  }
}
