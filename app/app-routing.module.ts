// Built-in Angular Apps
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// ShippingSpot Apps
import { LoginComponent } from "./Auth/login/login.component";
import { RegisterComponent } from "./Auth/register/register.component";
import { ProfileComponent } from "./Account/profile.component";
import {NavbarComponent} from "./Base/navbar/navbar.component";
import {ClientComponent} from "./Client/client.component";

export const routes: Routes = [
  {path: '', redirectTo: "/(login:login)", pathMatch: 'full', outlet: 'home'},
  {path: 'login', component: LoginComponent, outlet: "login"},
  {path: 'signup', component: RegisterComponent, outlet: "register"},
  {path: 'profile', component: ProfileComponent, outlet: "profile"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
