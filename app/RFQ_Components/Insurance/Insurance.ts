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
import {PackingService} from "../../interface-models/rfq_type_services/Packing";
import {FumigationService} from "../../interface-models/rfq_type_services/Fumigation";
import {HandlingEquipmentService} from "../../interface-models/rfq_type_services/HandlingEquipment";
import {InsuranceService} from "../../interface-models/rfq_type_services/Insurance";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-equipment',
  templateUrl: './Insurance.html',
  styleUrls: []
})

export class Insurance {
  service_type_param: any;
  rfq_group_id: any;

  formGroup: any;
  default_term: string = "-None-";
  shipping_modes: Array<string> = ["-None-", "air", "ocean", "land"];
  coves: Array<string> = ["-None-", 'Door to Door', 'Port to Port', 'Door to Port', 'Port to Door'];
  country_origin: Array<string> = ["-None-", "countries"];
  country_destination: Array<string> = ["-None-", "countries"];
  policy_types: Array<string> = ["-None-", "A", "B", "C"];

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

      Shipping_Mode: new FormControl<string>(this.default_term),
      Country_of_Origin: new FormControl<string>(this.default_term),
      Country_of_Destination: new FormControl<string>(this.default_term),
      Coverage: new FormControl<string>(this.default_term),
      Policy_Type: new FormControl<string>(this.default_term),
      Value: new FormControl<number|null>(null, [Validators.pattern(/d+/g)]),
    });
  }

  createRFQ(RFQForm: InsuranceService)
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
