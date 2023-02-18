// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {selectServiceType} from "../service_handlers";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {OceanFCLService} from "../../interface-models/rfq_type_services/OceanFCL";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {TruckingFTLService} from "../../interface-models/rfq_type_services/TruckingFTL";
import {TruckingLTLService} from "../../interface-models/rfq_type_services/TruckingLTL";
import {CourierService} from "../../interface-models/rfq_type_services/Courier";
import {DomesticCourierService} from "../../interface-models/rfq_type_services/DomesticCourier";
import {DomesticTruckingService} from "../../interface-models/rfq_type_services/DomesticTrucking";
import {ClearanceService, ServiceModeData} from "../../interface-models/rfq_type_services/Clearance";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-clearance',
  templateUrl: './Clearance.html',
  styleUrls: []
})

export class Clearance {
  service_type_param: any;
  rfq_group_id: any;

  formGroup: any;
  default_term: string = "-None-";
  service_operations: Array<string> = ["-None-", "Import", "Export"];
  modes: Array<string> = ["-None-", "Air", "Ocean", "Land"];
  Airports: Array<string> = ["-None-", "Cairo Airport", "Alexandria Airport"];
  Landports: Array<string> = ["-None-", "option2"];
  Seaports: Array<string> = ["-None-", 'Portsaid East Port', 'Portsaid West Port', 'Damietta Port', 'Suez Port', 'Adabiya Port'];

  constructor(private RFQService: RFQsService, private currentRoute: ActivatedRoute) {
    selectServiceType(this);
    // Get real name of the service
    this.currentRoute.queryParams.subscribe(res => {
      this.service_type_param = res.service_type;
    })

    this.rfq_group_id = this.currentRoute.parent?.snapshot.params.id;

    this.formGroup = new FormGroup({
      Commodity: new FormControl<string>('', [ Validators.required ]),
      Note: new FormControl<string>(''),

      HS_Code: new FormControl<number|null>(null),
      Service_Operation: new FormControl<string>(this.default_term),
      Service_Mode: new FormControl<string>(this.default_term),
      // Based On Service_Mode Criteria
      Airport: new FormControl<string>(this.default_term),
      Landport: new FormControl<string>(this.default_term),
      Seaport: new FormControl<string>(this.default_term),
      Gross_Weight_kg: new FormControl<string>(this.default_term),
      Quantity: new FormControl<string>(this.default_term),
      CBM: new FormControl<string>(this.default_term),
      Shipment_Gross_Weight_kg: new FormControl<string>(this.default_term),
      Number_of_Trucks: new FormControl<string>(this.default_term),

      Pickup_Country: new FormControl<string>(''),
      Delivery_Country: new FormControl<string>(''),
      Pickup_Address: new FormControl<string>(''),
      Delivery_Address: new FormControl<string>(''),
    });
  }

  showFields: Function = function (pickup_value: string) {
    console.log(pickup_value);
    // @ts-ignore
    let service_states = ServiceModeData()[pickup_value];
    return service_states;
  }

  createRFQ(RFQForm: ClearanceService)
  {
    // @ts-ignore
    let items = RFQForm.child; // store nested child
    Reflect.deleteProperty(RFQForm, "child"); // remove child
    items["Type"] = this.service_type_param; // add Type key to service type

    let _body = {
      Module: "RFQs",
      data: {
        Service_Type: this.service_type_param,
        RFQ_Group: {
          id: this.rfq_group_id
        },
        ...RFQForm
      },
      Lookup_name_in_module_related: "RFQ",
      Module_related: "Items",
      data_related: [items]
    }

    console.log(_body);

    this.RFQService.NewRecord(_body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
