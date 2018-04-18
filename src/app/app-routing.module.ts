import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }         from './app.component';
import { RoadmapComponent }     from './roadmap/roadmap.component';
import { EventComponent } from './event/components/event/event.component'
import { EventListComponent } from './event/components/event-list/event-list.component';
import { TransactionViewComponent } from './tricount/components/transaction-view/transaction-view.component';
import { FormComponent } from './event/components/form/form.component';

const routes: Routes = [
  { path: '', redirectTo: 'event/list', pathMatch:'full'},
  { path: 'event', component: EventComponent },
  { path: 'event/create', component: FormComponent },
  { path: 'event/list', component: EventListComponent },
  { path: 'tricount', component: TransactionViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}