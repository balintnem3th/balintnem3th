import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';

import { LoginComponent } from './login/login.component';
import { AddClientFormComponent } from './add-client-form/add-client-form.component';
import { AddPersonFormComponent } from './add-person-form/add-person-form.component';
import { TabbedListsComponent } from './tabbed-lists/tabbed-lists.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'clients/add', component: AddClientFormComponent, canActivate: [AuthGuard] },
  { path: 'persons/add', component: AddPersonFormComponent, canActivate: [AuthGuard] },
  { path: 'lists', component: TabbedListsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/clients/add', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
