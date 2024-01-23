import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  DataTableImplementation,
  DataFieldTypeEnum,
} from '../../shared/components/data-table/interfaces/dataTable.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  constructor() {}

  tableImplementation: DataTableImplementation = {
    path: 'invitations',
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

  rowClick($event: any) {
    console.log('Click', $event);
  }
}
