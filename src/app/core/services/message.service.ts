import { Injectable, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  horizontalPositionEnum,
  verticalPositionEnum,
} from '../enums/messageEnums';
import { commonMessageParams } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  commonMessage({
    message,
    action,
    duration = 2500,
    horizontalPosition = horizontalPositionEnum.Center,
    verticalPosition = verticalPositionEnum.Bottom,
  }: commonMessageParams) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }

  successMessage(message?: string, duration: number = 2500) {
    this.snackBar.open(
      message ? message : 'Operación realizada con éxito',
      undefined,
      {
        duration: duration,
        panelClass: ['snackbar-success'],
      }
    );
  }

  errorMessage(message?: string, duration: number = 2500) {
    this.snackBar.open(
      message ? message : 'Ocurrió un error. Intente de nuevo',
      undefined,
      {
        duration: duration,
        panelClass: ['snackbar-error'],
      }
    );
  }
}
