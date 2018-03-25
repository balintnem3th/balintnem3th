import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../client';
import { UserService } from '../user.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.css']
})
export class AddClientFormComponent implements OnInit {
  public myForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];

  public users: any;
  public date = new FormControl(new Date());
  public locations = [
    { place: 'A' },
    { place: 'B' },
    { place: 'C' }
  ];
  public provisions = [
    { type: 'a' },
    { type: 'b' },
    { type: 'c' }
  ];
  public statuses = [
    { state: 'X' },
    { state: 'Y' }
  ];
  public reasons = ['g', 'h', 'i'];
  public origin = [
    { where: 'x' },
    { where: 'y' },
    { where: 'z' }
  ];
  public history = [
    { prev: 'D' },
    { prev: 'E' },
    { prev: 'F' }
  ];
  public initiators = [
    { who: 'a' },
    { who: 'b' }
  ];
  public submitMessage = '';
  public hasError = false;

  public personsIds = [];

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      applicationDate: new FormControl(''),
      applicationLocation: new FormControl(''),
      name: new FormControl(''),
      type: new FormControl(''),
      status: new FormControl(''),
      applicationReason: new FormControl(''),
      origin: new FormControl(''),
      history: new FormControl('NULL'),
      initiator: new FormControl('NULL'),
      hasWrittenExtraInformation: new FormControl(''),
      writtenExtraInformation: new FormControl(''),
      memo: new FormControl(''),
      socialWorker: new FormControl('')
    });
    this.getUsers();
  }

  setPersons(ids): void {
    this.personsIds = ids;
  }

// Angular wants to parse the response text from the endpoint, and throws error even if status is 201
  saveClient(model: Client, isValid: boolean) {
    if (model.applicationDate === '') {
      model.applicationDate = this.date.value;
    }
    this.submitted = true;
    this.clientService.addClient(model).subscribe(
      data => undefined,
      (err) => {
        if (err.status === 409) {
          this.submitMessage = 'Hiba történt, már létező kliens';
          this.hasError = true;
        } else if (err.status !== 201) {
          this.submitMessage = 'Hiba történt';
          this.hasError = true;
        }else {
          this.hasError = false;
          this.submitMessage = 'Kliens hozzáadva';
        }
      });
    setTimeout(() => {
      this.submitMessage = '';
    },         2500);
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => { this.users = data; }
    );
  }
}
