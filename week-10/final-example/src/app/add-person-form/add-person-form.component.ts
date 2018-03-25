import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Person } from '../person';
import { UserService } from '../user.service';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-add-person-form',
  templateUrl: './add-person-form.component.html',
  styleUrls: ['./add-person-form.component.css']
})
export class AddPersonFormComponent {
  public addPersonForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  public users: any;
  public genders = [
    { name: 'Férfi', value: 'MALE' },
    { name: 'Nő', value: 'FEMALE' }
  ];
  public maritalStatuses = [
    { name: 'Egyedülálló', value: 'SINGLE' },
    { name: 'Özvegy', value: 'RELICT' },
    { name: 'Házas', value: 'MARRIED' },
    { name: 'Elvált', value: 'DIVORCED' }
  ];
  public roles = [
    { name: 'Apa', value: 'FATHER' },
    { name: 'Anya', value: 'MOTHER' },
    { name: 'Gyermek', value: 'CHILD' },
    { name: 'Nagymama', value: 'GRANDMOTHER' },
    { name: 'Nagypapa', value: 'GRANDFATHER' },
    { name: 'Nagynéni', value: 'AUNT' },
    { name: 'Nagybácsi', value: 'UNCLE' }
  ];
  public submitMessage = '';
  public hasError = false;
  public isUnderProtection = false;
  @Output() personAdded: EventEmitter<object> = new EventEmitter<object>();
  @Output() resettingForm: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private personService: PersonService
  ) {
    this.createForm();
  }

  private createForm() {
    this.addPersonForm = this.fb.group({
      name: ['', [Validators.required]],
      gender: ['', []],
      birthName: ['', []],
      birthPlace: ['', []],
      dateOfBirth: ['', []],
      mothersName: ['', []],
      idNumber: ['', []],
      socialSecurity: ['', []],
      permanentAddress: ['', []],
      permanentAddressSince: ['', []],
      temporaryAddress: ['', []],
      temporaryAddressSince: ['', []],
      currentAddress: ['', []],
      currentAddressSince: ['', []],
      isUnderProtection: ['', []],
      roles: ['', []],
      maritalStatus: ['', []],
      phoneNumber: ['', []],
      email: ['', [Validators.email]],
      memo: ['', []]
    });
  }

  savePerson(model: Person, isValid: boolean) {
    this.submitted = true;
    this.personService.addPerson(model).subscribe(
      data => undefined,
      (err) => {
        if (err.status === 409) {
          this.submitMessage = 'Hiba történt, már létező személy';
          this.hasError = true;
        } else if (err.status !== 201) {
          this.submitMessage = 'Hiba történt';
          this.hasError = true;
        } else {
          this.hasError = false;
          this.submitMessage = 'Személy hozzáadva';
          model.personId = err.headers.get('Location').replace('api/persons/', '');
          this.sendPerson(model);
        }
        setTimeout(() => {
          this.submitMessage = '';
        },         3500);
      });
  }

  sendPerson(personModel) {
    this.personAdded.emit(personModel);
  }

  resetForm() {
    this.resettingForm.emit(null);
  }
}
