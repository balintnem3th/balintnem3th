import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ClientService } from '../client.service';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})

@Injectable()
export class ClientListComponent implements OnInit {

  public dataSent: any;
  public headerSent: any;
  public columns = [];
  public displayedColumns;

  headerList = [
    { key: 'id', label: 'Id', where: 'clientPerson' },
    { key: 'name', label: 'Név', where: 'clientPerson' },
    { key: 'status', label: 'Státusz', where: 'clients' },
    { key: 'type', label: 'Ellátás típusa', where: 'clients' },
    { key: 'number', label: 'Létszám', where: 'clients' },
    { key: 'territory', label: 'Illetékesség', where: 'clients' },
    { key: 'phoneNumber', label: 'Telefonszám', where:  'clientPerson' },
    { key: 'applicationDate', label: 'Jelentkezés dátuma', where: 'clients' },
    { key: 'applicationLocation', label: 'Jelentkezés helye', where: 'clients' },
    { key: 'applicationReason', label: 'Jelentkezés oka', where: 'clients' },
    { key: 'contacts', label: 'Kapcsolatok', where: 'clients' },
    { key: 'hasWrittenExtraInformation', label: 'Van-e írásos információ?', where: 'clients' },
    { key: 'history', label: 'Előzmény', where: 'clients' },
    { key: 'initiator', label: 'Ellátást kezdeményező', where: 'clients' },
    { key: 'origin', label: 'Honnan érkezett', where: 'clients' },
    { key: 'postalAddress', label: 'Postai cím', where: 'clients' },
    { key: 'socialWorker', label: 'Szociális munkás', where: 'clients' },
    { key: 'writtenExtraInformation', label: 'Egyéb írásos információ', where: 'clients' },
  ];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe(
      (data) => {
        this.dataSent = data;
      }
    );
    this.createClientHeader().subscribe(
      (clientsColumn) => {
        this.headerSent = clientsColumn;
      });
  }

  createClientHeader(): Observable <any> {
    const clientsColumn = this.headerList.filter(
      header => header.where === 'clients' || header.where === 'clientPerson'
    );
    return of(clientsColumn);
  }
}
