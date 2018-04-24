import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertsService } from './tools/alerts/alerts.service';
import { ListUsersComponent } from './event/components/list-users/list-users.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { AppRoutingModule } from './/app-routing.module';
import { EventService } from './event/services/event/event.service'
import { HttpClientModule } from '@angular/common/http';
import { EventComponent } from './event/components/event/event.component';
import { EventHttpService } from './event/services/http/event-http.service';
import { LOCALE_ID } from '@angular/core';
import { AlertsComponent } from './tools/alerts/alerts.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TransactionButtonComponent } from './tricount/components/transaction-button/transaction-button.component';
import { TransactionViewComponent } from './tricount/components/transaction-view/transaction-view.component';
import { EventListComponent } from './event/components/event-list/event-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LoaderComponent } from './tools/loader/loader.component';
import { UserPanelComponent } from './user/components/user-panel/user-panel.component';
import { UserService } from './user/services/user/user.service';
import { RegisterComponent } from './authentication/components/register/register.component';
import { AuthenticateHttpService } from './authentication/services/http/authenticate-http.service';
import { AuthenticationService } from './authentication/services/authentication/authentication.service';
import { MenuComponent } from './menu/components/menu/menu.component';
import { MenuService } from './menu/services/menu.service';
import { TransactionService } from './tricount/services/transaction.service';
import { TransactionhttpService } from './tricount/services/transactionhttp.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatDialog, MatDialogModule, MatListModule, MatDatepicker, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatFormFieldControl, MatInputModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { FormComponent } from './event/components/form/form.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    RoadmapComponent,
    EventComponent,
    AlertsComponent,
    TransactionViewComponent,
    EventListComponent,
    LoaderComponent,
    UserPanelComponent,
    RegisterComponent,
    MenuComponent,
    TransactionButtonComponent,
    FormComponent
  ],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTableModule
  ],
  entryComponents: [
    TransactionButtonComponent
  ],
  providers: [
    EventService,
    AlertsService,
    EventHttpService,
    UserService,
    AuthenticationService,
    AuthenticateHttpService,
    TransactionService,
    TransactionhttpService,
    MenuService,
    { provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
