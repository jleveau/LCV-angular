import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AlertsService } from './alerts/alerts.service';
import { RegisterButtonComponent } from './event/components/register-button/register-button.component';
import { ListUsersComponent } from './event/components/list-users/list-users.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { AppRoutingModule } from './/app-routing.module';
import { EventService } from './event/services/event/event.service'
import { HttpClientModule } from '@angular/common/http';
import { EventComponent } from './event/components/event/event.component';
import { EventHttpService } from './event/services/http/event-http.service';
import { LOCALE_ID } from '@angular/core';
import { AlertsComponent } from './alerts/alerts.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TransactionButtonComponent } from './tricount/transaction-button/transaction-button.component';
import { TransactionViewComponent } from './tricount/transaction-view/transaction-view.component';
import { EventListComponent } from './event/components/event-list/event-list.component';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    RegisterButtonComponent,
    ListUsersComponent,
    RoadmapComponent,
    EventComponent,
    AlertsComponent,
    TransactionButtonComponent,
    TransactionViewComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    EventService,
    AlertsService,
    EventHttpService,
    { provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
