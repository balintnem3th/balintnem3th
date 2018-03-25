import { Component, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef , MAT_DIALOG_DATA  } from '@angular/material';
import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';
import { PersonListComponent } from '../person-list/person-list.component';
import { SearchPersonDialogComponent } from '../search-person-dialog/search-person-dialog.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-related-persons',
  templateUrl: './related-persons.component.html',
  styleUrls: ['./related-persons.component.css']
})
export class RelatedPersonsComponent {

  private displayedColumns = ['name', 'controls'];
  private relatedPersons: MatTableDataSource<any> = new MatTableDataSource([]);
  public searchPerson: SearchPersonDialogComponent;
  @Output() personsChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(
      AddPersonDialogComponent,
      {
        width: '80%',
        data: { person: { id: 0, name: '' } }
      }
    );
    dialogRef.afterClosed().subscribe((persons) => {
      if (persons) {
        persons.forEach((person) => {
          const copiedPersons = this.relatedPersons.data.slice();
          copiedPersons.push(person);
          this.relatedPersons.data = copiedPersons;
          this.emitPersonsIds();
        });
      }
    });
  }

  openTable(): void {
    const dialogTableRef = this.dialog.open(
      SearchPersonDialogComponent,
      {
        width: '80%',
      }
    );
    dialogTableRef.afterClosed().subscribe((personsList) => {
      if (personsList) {
        console.log('PerssonsList', personsList.row);
        personsList.row.forEach((person) => {
          const copiedPersons = this.relatedPersons.data.slice();
          copiedPersons.push(person);
          this.relatedPersons.data = copiedPersons;
          this.emitPersonsIds();
        });
      }
    });
  }

  changePerson(person: any): void {
    const copiedPersons = this.relatedPersons.data.map((personData) => {
      if (person.id === personData.id) {
        personData = person;
      }
      return personData;
    });
    this.relatedPersons.data = copiedPersons;
    this.emitPersonsIds();
  }

  deletePerson(person: any): void {
    const copiedPersons = this.relatedPersons.data.filter((personData) => {
      return (person.id !== personData.id);
    });
    this.relatedPersons.data = copiedPersons;
    this.emitPersonsIds();
  }

  emitPersonsIds() {
    this.personsChanged.emit(this.relatedPersons.data.map(person => person.id));
  }

}
