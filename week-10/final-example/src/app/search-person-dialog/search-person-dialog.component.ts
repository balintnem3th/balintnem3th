import { Component, OnInit, Inject , Injectable } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import { RelatedPersonsComponent } from '../related-persons/related-persons.component';
@Component({
  selector: 'app-search-person-dialog',
  templateUrl: './search-person-dialog.component.html',
  styleUrls: ['./search-person-dialog.component.css']
})
export class SearchPersonDialogComponent implements OnInit {

  public boolSent: boolean;
  public saveButton: boolean;
  public catchedRow: any;

  constructor(
    public dialogTableRef: MatDialogRef<SearchPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.boolSent = true;
    this.saveButton = true;
  }


  rowCatchter(row: any): void {
    this.dialogTableRef.close(
      {
        row
      }
    );
  }
}
