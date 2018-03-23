import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }         from './app.component';
import { RoadmapComponent }     from './roadmap/roadmap.component';
import { ReservationComponent } from './reservation/components/main/reservation.component'

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: ReservationComponent },
  { path: 'roadmap', component: RoadmapComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}