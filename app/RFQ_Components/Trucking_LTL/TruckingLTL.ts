// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OceanFCLService} from "../../interface-models/rfq_type_services/OceanFCL";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {TruckingFTLService} from "../../interface-models/rfq_type_services/TruckingFTL";
import {TruckingLTLService} from "../../interface-models/rfq_type_services/TruckingLTL";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-trucking-ftl',
  templateUrl: './TruckingLTL.html',
  styleUrls: []
})

export class TruckingLTL {
  service_type_param: any;
  rfq_group_id: any;

  formGroup: any;
  default_term: string = "-None-";
  terms: Array<string> = ["Door to Door", "Port to Port", "Incoterm"];
  incoterms: Array<string> = ['EXW', 'EX Works', 'FCA', 'Free Carrier', 'FAS', 'Free Alongside Ship', 'FOB', 'Free On Board', 'CFR', 'Cost & Freight', 'CIF', 'Cost Insurance & Freight', 'CPT', 'Carriage Paid To', 'CIP', 'Carriage Insurance Paid To', 'DAP', 'Delivered At Place', 'DPU', 'Delivered at Place Unloaded', 'DDP', 'Delivered Duty Paid'];

  constructor(private RFQService: RFQsService, private currentRoute: ActivatedRoute) {
    selectServiceType(this);
    // Get real name of the service
    this.currentRoute.queryParams.subscribe(res => {
      this.service_type_param = res.service_type
    })

    this.rfq_group_id = this.currentRoute.parent?.snapshot.params.id;

    this.formGroup = new FormGroup({
      Commodity: new FormControl<string>('', [ Validators.required ]),
      Note: new FormControl<string>(''),

      Shipping_Term: new FormControl<string>(this.default_term),
      Incoterm: new FormControl<string>(this.default_term),
      Need_Insurance: new FormControl<boolean>(false),
      Value_of_Goods: new FormControl<number|null>(null),
      Dangerous_Commodity: new FormControl<boolean>(false),
      Need_Temperature_Control: new FormControl<boolean>(false),
      Temperature: new FormControl<number|null>(null),

      Pickup_Country: new FormControl<string>(''),
      Delivery_Country: new FormControl<string>(''),
      Pickup_Address: new FormControl<string>(''),
      Delivery_Address: new FormControl<string>(''),
      POL_Port_of_Loading: new FormControl<string>(''),
      POD_Port_of_Discharge: new FormControl<string>(''),

      Total_Number_of_Packages: new FormControl<string>('', [ Validators.pattern(/d+/g) ]),
      Total_Net_Weight: new FormControl<string>('', [ Validators.pattern(/d+/g) ]),
      Total_Gross_weight: new FormControl<string>('', [ Validators.pattern(/d+/g) ]),
    });
  }

  createRFQ(RFQForm: TruckingLTLService)
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
