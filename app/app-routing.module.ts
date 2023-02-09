// Built-in Angular Apps
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// ShippingSpot Apps
import { LoginComponent } from "./Auth/login/login.component";
import { RegisterComponent } from "./Auth/register/register.component";
import { ProfileComponent } from "./Account/profile.component";
import { ClientComponent } from "./Client/client.component";
import {RfqgroupcompComponent} from "./Client/RFQGroupComp/rfqgroupcomp.component";

if (location.pathname === "/app/") {
  location.href = location.href + "/(login:login)";
}

export const routes: Routes = [
  {path: '', redirectTo: '/(login:login)', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, outlet: "login"},
  {path: 'signup', component: RegisterComponent, outlet: "register"},
  {path: 'profile', component: ProfileComponent, outlet: "profile"},
  // {path: 'profile/client', component: ClientComponent, outlet: "client"},
  {path: 'profile/client', component: ClientComponent, outlet: 'client', children: [
      {
        path: 'profile/client/rfq_group',
        component: RfqgroupcompComponent,
        outlet: "rfq_group"
      }
  ]},
  // {path: 'profile/client/rfq_group', component: RfqgroupcompComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
