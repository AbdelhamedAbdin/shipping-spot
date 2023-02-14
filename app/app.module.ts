import {NgModule} from '@angular/core';
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
// import {Air_Freight_ItemsComponent} from "./RFQ_Components/MainForm/MainForm.component";
import {AirFreight} from "./RFQ_Components/Air_Freight/AirFreight";
import {OceanFCL} from "./RFQ_Components/Ocean_FCL/OceanFCL";
import {createRFQs} from "./RFQ_Components/none_service_items";
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

@NgModule({
  declarations: [
    AppComponent,
    // Logging components
    LoginComponent,
    RegisterComponent,
    // Account Component
    ProfileComponent,
    ClientComponent,
    ProviderComponent,
    // DashBoard
    ReportComponent,
    // RFQ
    RFQComponent,
    CreateRFQComponent,
    // RFQ::Components
    // Air_Freight_ItemsComponent,
    AirFreight,
    OceanFCL,
    OceanLCL,
    TruckingFTL,
    TruckingLTL,
    Courier,
    DomesticCourier,
    DomesticTrucking,
    Clearance,
    StorageComp,
    Packing,
    Fumigation,
    Equipment,
    Insurance,
    // Popup
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
  providers: [createRFQs],
  bootstrap: [AppComponent]
})

export class AppModule {

}
