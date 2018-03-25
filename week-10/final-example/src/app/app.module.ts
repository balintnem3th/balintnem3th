import { BrowserModule } from '@angular/platform-browser';
import { NgModule, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatPaginatorIntl,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef
  } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddClientFormComponent } from './add-client-form/add-client-form.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { RelatedPersonsComponent } from './related-persons/related-persons.component';
import { AddPersonDialogComponent } from './add-person-dialog/add-person-dialog.component';

import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { ClientService } from './client.service';
import { SessionUserService } from './session-user.service';
import { AppRoutingModule } from './app-routing.module';
import { GenericListComponent, MatPaginatorIntlHun } from './generic-list/generic-list.component';
import { TabbedListsComponent } from './tabbed-lists/tabbed-lists.component';
import { PersonService } from './person.service';
import { AddPersonFormComponent } from './add-person-form/add-person-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { PersonListComponent } from './person-list/person-list.component';
import { EmptyBodyInterceptor } from './empty-body.interceptor';
import { SearchPersonDialogComponent } from './search-person-dialog/search-person-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AddClientFormComponent,
    LoginComponent,
    HeaderComponent,
    GenericListComponent,
    TabbedListsComponent,
    PersonListComponent,
    RelatedPersonsComponent,
    AddPersonDialogComponent,
    AddPersonFormComponent,
    ClientListComponent,
    SearchPersonDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    UserService,
    ClientService,
    PersonService,
    AuthenticationService,
    SessionUserService,
    { provide: MAT_DATE_LOCALE, useValue: 'hu-Hu' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlHun },
    { provide: HTTP_INTERCEPTORS, useClass: EmptyBodyInterceptor, multi: true }
  ],
  entryComponents: [
    AddPersonDialogComponent,
    PersonListComponent,
    SearchPersonDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
