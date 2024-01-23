import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialogData.interface';

@Component({
  selector: 'app-dialog-general',
  templateUrl: './dialog-general.component.html',
  styleUrls: ['./dialog-general.component.scss']
})
export class DialogGeneralComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogGeneralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
