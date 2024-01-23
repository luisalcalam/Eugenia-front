import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { DialogConfirmComponent } from 'src/app/shared/components/dialogs/dialog-confirm/dialog-confirm.component';
import { DialogGeneralComponent } from 'src/app/shared/components/dialogs/dialog-general/dialog-general.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private confirmResult$ = new Subject<boolean>();

  constructor(private dialog: MatDialog) {}

  openSuccesModal() {
    this.dialog.open(DialogGeneralComponent, {
      width: '450px',
    });
  }

  openErrorModal() {
    this.dialog.open(DialogGeneralComponent, {
      width: '450px',
      data: {
        title: 'Ocurrio un error al realzar la acción solicitada',
        icon: 'error',
      },
    });
  }

  confirmModal() {
    const dialogRef = this.dialog.open<
      DialogConfirmComponent,
      MatDialogConfig,
      boolean
    >(DialogConfirmComponent, {
      width: '450px',
      disableClose: true,
    });

    return dialogRef;
  }
}
