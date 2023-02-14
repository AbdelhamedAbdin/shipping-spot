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
import {AirFreight} from "./RFQ_Components/Air_Freight/AirFreight";
import {OceanFCL} from "./RFQ_Components/Ocean_FCL/OceanFCL";
import {OceanLCL} from "./RFQ_Components/Ocean_LCL/OceanLCL";
import {TruckingFTL} from "./RFQ_Components/Trucking_FTL/TruckingFTL";
import {TruckingLTL} from "./RFQ_Components/Trucking_LTL/TruckingLTL";
import {Courier} from "./RFQ_Components/Courier/Courier";
import {DomesticCourier} from "./RFQ_Components/Domestic_Courier/DomesticCourier";
import {DomesticTrucking} from "./RFQ_Components/Domestic_Trucking/DomesticTrucking";
import {Clearance} from "./RFQ_Components/Clearance/Clearance";
import {StorageComp} from "./RFQ_Components/Storage/StorageComp";
import {Packing} from "./RFQ_Components/Packing/Packing";
import {Fumigation} from "./RFQ_Components/Fumigation/Fumigation";
import {Equipment} from "./RFQ_Components/Equipment/Equipment";
import {Insurance} from "./RFQ_Components/Insurance/Insurance";
import {ProviderComponent} from "./Provider/provider.component";

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
  {path: 'profile/provider', component: ProviderComponent},
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
      {path: ':service_type', component: AirFreight, outlet: 'Air_Freight'},
      {path: ':service_type', component: OceanFCL, outlet: 'Ocean_Freight_FCL'},
      {path: ':service_type', component: OceanLCL, outlet: 'Ocean_Freight_LCL'},
      {path: ':service_type', component: TruckingFTL, outlet: 'International_Trucking_FTL'},
      {path: ':service_type', component: TruckingLTL, outlet: 'International_Trucking_LTL'},
      {path: ':service_type', component: Courier, outlet: 'International_Courier'},
      {path: ':service_type', component: DomesticCourier, outlet: 'Domestic_Courier'},
      {path: ':service_type', component: DomesticTrucking, outlet: 'Domestic_Trucking'},
      {path: ':service_type', component: Clearance, outlet: 'Custom_Clearance'},
      {path: ':service_type', component: StorageComp, outlet: 'Storage'},
      {path: ':service_type', component: Packing, outlet: 'Packing'},
      {path: ':service_type', component: Fumigation, outlet: 'Fumigation'},
      {path: ':service_type', component: Equipment, outlet: 'Handling_Equipment'},
      {path: ':service_type', component: Insurance, outlet: 'Insurance'},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
