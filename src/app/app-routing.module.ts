import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./authentication/components/register/register.component";
import { MainComponent } from "./main/main/main.component";
import { AuthenticationService } from "./authentication/services/authentication/authentication.service";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: 'full'},
  { path: 'login', component: RegisterComponent },
  { path: 'home', component: MainComponent, canActivate: [AuthenticationService]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}