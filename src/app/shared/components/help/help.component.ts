import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HelpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Object) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
