
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { EventComponent } from '../../event/components/event/event.component';
import { FormComponent } from '../../event/components/form/form.component';
import { EventListComponent } from '../../event/components/event-list/event-list.component';
import { TransactionViewComponent } from '../../tricount/components/transaction-view/transaction-view.component';
import { AuthenticationService } from '../../authentication/services/authentication/authentication.service';


const routes: Routes = [
  {
    path: '', 
    component: MainComponent,
    canActivate: [AuthenticationService],
    children: [
    { path: '', redirectTo: "event-list", pathMatch: 'full'},
    { path: 'event/:id', component: EventComponent },
    { path: 'event-create', component: FormComponent },
    { path: 'event-list', component: EventListComponent },
    { path: 'tricount', component: TransactionViewComponent }
  ]}
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule]
})
export class MainRoutingModule {}