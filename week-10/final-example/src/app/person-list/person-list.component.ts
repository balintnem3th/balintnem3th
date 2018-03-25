import { Component, OnInit, Injectable, Input, Inject, Optional, Output,  EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { PersonService } from '../person.service';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

@Injectable()
export class PersonListComponent implements OnInit {
  public dataSent: any;
  public headerSent: any;
  public columns = [];
  public personRow: any;
  @Input() checker: boolean;
  @Input() save: boolean;
  @Output() rowToPass: EventEmitter<any> = new EventEmitter();

  headerList = [
    { key: 'name', label: 'Név', where: 'clientPerson' },
    { key: 'mothersName', label: 'Anyja neve', where: 'persons' },
    { key: 'dateOfBirth', label: 'Születési idő', where: 'persons' },
    { key: 'healthInsuranceCardNumber', label: 'TAJ-kártya száma', where: 'persons' },
    { key: 'clients', label: 'Ügyfél', where: 'persons' },
    { key: 'phoneNumber', label: 'Telefonszám', where:  'clientPerson' },
    { key: 'id', label: 'Id', where: 'clientPerson' },
    { key: 'address', label: 'Cím', where: 'persons' },
    { key: 'addressSince', label: 'Cím bejelentésének ideje', where: 'persons' },
    { key: 'birthPlace', label: 'Születési hely', where: 'persons' },
    { key: 'bornAs', label: 'Születési név', where: 'persons' },
    { key: 'correspondingAddress', label: 'Tartozkodási hely', where: 'persons' },
    { key: 'correspondingAddressSince', label: 'Tartozkodási hely bejelentésének ideje', where: 'persons' },
    { key: 'email', label: 'E-mail cím', where: 'persons' },
    { key: 'gender', label: 'Neme', where: 'persons' },
    { key: 'idCardNumber', label: 'Személyi igazolvány szám', where: 'persons' },
    { key: 'maritalStatus', label: 'Családi állapot', where: 'persons' },
    { key: 'memo', label: 'Memo', where: 'clientPerson' },
    { key: 'role', label: 'Szerep', where: 'persons' },
    { key: 'temporaryAddress', label: 'Ideiglenes tartózkodási hely', where: 'persons' },
    { key: 'temporaryAddressSince', label: 'Ideiglenes tartózkodási hely bejelentésének ideje', where: 'persons' },
    { key: 'underProtection', label: 'Védelem alatt áll-e?', where: 'persons' }
  ];

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.loadPersons();

    console.log('checker', this.save);
  }

  loadPersons() {
    this.personService.getPersons().subscribe(
      (data) => {
        console.log('merlin data', data);
        this.dataSent = data;
      }
    );
    this.createPersonHeader().subscribe(
      (personsColumn) => {
        this.headerSent = personsColumn;
      }
    );
  }

  catchRow(personIdNameRow) {
    this.personRow = personIdNameRow;
    console.log(this.personRow);
    this.rowToPass.emit(this.personRow);
  }

  createPersonHeader(): Observable <any> {
    const personsColumn = this.headerList;
    return of(personsColumn);
  }

}
