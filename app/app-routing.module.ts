// Built-in Angular Apps
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ShippingSpot Apps
import { LoginComponent } from "./Auth/login/login.component";
import { RegisterComponent } from "./Auth/register/register.component";
import { ProfileComponent } from "./Account/profile.component";
import { ClientComponent } from "./Client/client.component";
import { ReportComponent } from "./Dashboard/Report/report.component";
import { RFQComponent } from "./RFQ/RFQ.component";
import {CreateRFQComponent} from "./RFQ/createRfq/CreateRFQ.component";
import {RFQFormComponent} from "./RFQ_Components/RFQForm.component";
import {AirFreight} from "./RFQ_Components/Air_Freight/AirFreight";
import {OceanFCL} from "./RFQ_Components/Ocean_FCL/OceanFCL";

if (location.pathname === "/app/") {
  location.href = location.href + "/(login:login)";
}

export const routes: Routes = [
  // Home
  {path: '', redirectTo: '/(login:login)', pathMatch: 'full'},
  // Logging
  {path: 'login', component: LoginComponent, outlet: "login"},
  {path: 'signup', component: RegisterComponent, outlet: "register"},
  // Profile
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/client', component: ClientComponent},
  // Dashboard
  {path: 'dashboard',
    children: [
      {path: '', redirectTo: '/report', pathMatch: 'full'},
      {path: 'report', component: ReportComponent}
    ]
  },
  // RFQ
  {path: 'rfq', component: RFQComponent},
  {path: 'rfq/:id', component: CreateRFQComponent,
    children: [
      // {path: ":service_name", component: RFQFormComponent},
      {path: ':service_type', component: AirFreight, outlet: 'Air_Freight'},
      {path: ':service_type', component: OceanFCL, outlet: 'Ocean_Freight_FCL'}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
