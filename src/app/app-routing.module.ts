import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }         from './app.component';
import { RoadmapComponent }     from './roadmap/roadmap.component';
import { EventComponent } from './event/components/event/event.component'
import { EventListComponent } from './event/components/event-list/event-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/event/list', pathMatch: 'full' },
  { path: 'event', component: EventComponent },
  { path: 'events/list', component: EventListComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}