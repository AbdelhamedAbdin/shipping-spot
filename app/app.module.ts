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
import { PageTitleComponent } from "./popup/page_title/pageTitle.component";
import {CreateRFQComponent} from "./RFQ/createRfq/CreateRFQ.component";
// import {Air_Freight_ItemsComponent} from "./RFQ_Components/MainForm/MainForm.component";
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
import {RFQJobs} from "./RFQ_Jobs/RFQJobs";
import {RFQJobDetails} from "./RFQ_Jobs/RFQ_Details/RFQJobDetails";
import {SPAirFreight} from "./SP_Components/Air_Freight/SPAirFreight";
import {SPOceanFCL} from "./SP_Components/Ocean_FCL/SPOceanFCL";
import {SPOceanLCL} from "./SP_Components/Ocean_LCL/SPOceanLCL";
import {SPTruckFTL} from "./SP_Components/Truck_FTL/SPTruckFTL";
import {SPTruckLTL} from "./SP_Components/Truck_LTL/SPTruckLTL";
import {SPInterCourier} from "./SP_Components/InterCouirer/SPInterCourier";
import {SPDomesticDelivery} from "./SP_Components/DomesticDelivery/SPDomesticDelivery";
import {SPDomesticCourier} from "./SP_Components/DomesticCourier/SPDomesticCourier";
import {SPClearance} from "./SP_Components/Clearance/SPClearance";
import {SPStorage} from "./SP_Components/SP_Storage/SPStorage";
import {SPPacking} from "./SP_Components/Packing/SPPacking";
import {SPFumigation} from "./SP_Components/Fumigation/SPFumigation";
import {SPEquipment} from "./SP_Components/Equipments/SPEquipment";
import {SPInsurance} from "./SP_Components/Insurance/SPInsurance";
import {FollowRequests} from "./RFQ_Jobs/Follow_Requests/FollowRequests";
import {HeaderComponent} from "./Auth/header/Header";
import {SpinnerComponent} from "./popup/spinner/Spinner.component";
import {FlashComponent} from "./flash_message/Flash.component";
import {DraftComponent} from "./Draft/Draft.component";
import {RemoveRFQComponent} from "./popup/remove-rfq/removeRFQ.component";
import {ArchivedComponent} from "./Archived/Archived.component";

@NgModule({
  declarations: [
    AppComponent,
    // Logging components
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
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
    // MainFormComponent,
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
    // RFQ_Jobs
    RFQJobs,
    RFQJobDetails,
    FollowRequests,
    // SP::Components
    SPAirFreight,
    SPOceanFCL,
    SPOceanLCL,
    SPTruckFTL,
    SPTruckLTL,
    SPInterCourier,
    SPDomesticDelivery,
    SPDomesticCourier,
    SPClearance,
    SPStorage,
    SPPacking,
    SPFumigation,
    SPEquipment,
    SPInsurance,
    // Popup
    PageTitleComponent,
    SpinnerComponent,
    FlashComponent,
    RemoveRFQComponent,
    // Draft
    DraftComponent,
    // Archived
    ArchivedComponent
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
