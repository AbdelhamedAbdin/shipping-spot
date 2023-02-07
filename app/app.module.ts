import {ElementRef, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from "./Auth/register/register.component";
import { ProfileComponent } from './Account/profile.component';
import { NavbarComponent } from './Base/navbar/navbar.component';
import { SidebarComponent } from "./Base/sidebar/sidebar.component";
import { BreadcrumbComponent } from "./Base/breadcrumb/breadcrumb.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientComponent } from "./Client/client.component";
import { BaseComponent } from "./Base/base/base.component";


@NgModule({
  declarations: [
    AppComponent,
    // Logging components
    LoginComponent,
    RegisterComponent,
    // Account Component
    ProfileComponent,
    ClientComponent,
    // Base Component
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
