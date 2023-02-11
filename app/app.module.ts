import {ElementRef, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from "./Auth/register/register.component";
import { ProfileComponent } from './Account/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientComponent } from "./Client/client.component";
import { ReportComponent } from "./Dashboard/Report/report.component";
import { RFQComponent } from "./RFQ/RFQ.component";
import { PageTitleComponent } from "./popup/pageTitle.component";
import {CreateRFQComponent} from "./RFQ/createRfq/CreateRFQ.component";
import {RFQFormComponent} from "./RFQ_Components/RFQForm.component";
import {MainFormComponent} from "./RFQ_Components/MainForm/MainForm.component";
import {AirFreight} from "./RFQ_Components/Air_Freight/AirFreight";
import {OceanFCL} from "./RFQ_Components/Ocean_FCL/OceanFCL";


@NgModule({
  declarations: [
    AppComponent,
    // Logging components
    LoginComponent,
    RegisterComponent,
    // Account Component
    ProfileComponent,
    ClientComponent,
    // DashBoard
    ReportComponent,
    // RFQ
    RFQComponent,
    CreateRFQComponent,
    RFQFormComponent,
    MainFormComponent,
    AirFreight,
    OceanFCL,
    // popup
    PageTitleComponent
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
