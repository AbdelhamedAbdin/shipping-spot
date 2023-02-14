// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {selectServiceType} from "../run_event";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OceanFCLService} from "../../interface-models/rfq_type_services/OceanFCL";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {TruckingFTLService} from "../../interface-models/rfq_type_services/TruckingFTL";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-trucking-ftl',
  templateUrl: './TruckingFTL.html',
  styleUrls: []
})

export class TruckingFTL {
  service_type_param: any;
  rfq_group_id: any;

  formGroup: any;
  default_term: string = "-- None --";
  terms: Array<string> = ["Door to Door", "Port to Port", "Incoterm"];
  incoterms: Array<string> = ["Option 1", "Option 2"];
  choose_truck_or_shipment = ["Choose Truck", "Enter Shipment Detail"];

  constructor(private RFQService: RFQsService, private currentRoute: ActivatedRoute) {
    selectServiceType(this);
    // Get real name of the service
    this.currentRoute.queryParams.subscribe(res => {
      this.service_type_param = res.service_type
    })

    this.rfq_group_id = this.currentRoute.parent?.snapshot.params.id;

    this.formGroup = new FormGroup({
      Request_Title: new FormControl<string>('', [ Validators.required ]),
      Commodity: new FormControl<string>('', [ Validators.required ]),
      Note: new FormControl<string>(''),

      FCL_LCL: new FormControl<string>(''),
      CBM: new FormControl<string>(''),
      maximum_per_item_weight_kg: new FormControl<string>('', [ Validators.pattern(/d+/) ]),
      Equipment_Type: new FormControl<string>(''),

      Shipping_Term: new FormControl<string>(this.default_term),
      Incoterm: new FormControl<string>(''),
      Need_Insurance: new FormControl<string>(''),
      Value_of_Goods: new FormControl<string>('', [ Validators.pattern('([0-9]*[.])?[0-9]+') ]),
      Dangerous_Commodity: new FormControl<boolean>(false),
      Need_Temperature_Control: new FormControl<boolean>(false),
      Temperature: new FormControl<string>(''),

      Pickup_Country: new FormControl<string>(''),
      Delivery_Country: new FormControl<string>(''),
      Pickup_Address: new FormControl<string>(''),
      Delivery_Address: new FormControl<string>(''),
      POL_Port_of_Loading: new FormControl<string>(''),
      POD_Port_of_Discharge: new FormControl<string>(''),

      Description: new FormControl<string>('')
    });
  }

  createRFQ(RFQForm: TruckingFTLService)
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
