import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.css']
})
export class AddPersonDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]
  ) {}

  sendPerson(person: any): void {
    this.dialogRef.close(
      {
        id: person.personId,
        name: person.name
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
