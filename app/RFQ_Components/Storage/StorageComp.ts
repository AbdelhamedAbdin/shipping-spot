// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OceanFCLService} from "../../interface-models/rfq_type_services/OceanFCL";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {TruckingFTLService} from "../../interface-models/rfq_type_services/TruckingFTL";
import {TruckingLTLService} from "../../interface-models/rfq_type_services/TruckingLTL";
import {CourierService} from "../../interface-models/rfq_type_services/Courier";
import {StorageService} from "../../interface-models/rfq_type_services/Storage";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-storage',
  templateUrl: './StorageComp.html',
  styleUrls: []
})

export class StorageComp {
  service_type_param: any;
  rfq_group_id: any;

  formGroup: any;
  default_term: string = "-None-";
  space_types: Array<string> = ["-None-", "Square Meter", "Cubic Meter"];
  storage_types: Array<string> = ["-None-", "Fixed Space", "Per Cargo Size"];

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

      Space_Type: new FormControl<string>(this.default_term),
      Storage_Type: new FormControl<string>(this.default_term),
      City: new FormControl<string>(''),
      Preferred_District: new FormControl<string>(''),
      Space: new FormControl<number|null>(null),

      From: new FormControl<Date>(new Date()),
      To: new FormControl<Date>(new Date()),

      Total_Number_of_Packages: new FormControl<number|null>(null, [ Validators.pattern(/d+/g) ]),
      Total_Net_Weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/g) ]),
      Total_Gross_weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/g) ]),
    });
  }

  createRFQ(RFQForm: StorageService)
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
