// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {selectServiceType} from "../run_event";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OceanFCLService} from "../../interface-models/rfq_type_services/OceanFCL";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {TruckingFTLService} from "../../interface-models/rfq_type_services/TruckingFTL";
import {TruckingLTLService} from "../../interface-models/rfq_type_services/TruckingLTL";
import {CourierService} from "../../interface-models/rfq_type_services/Courier";
import {DomesticCourierService} from "../../interface-models/rfq_type_services/DomesticCourier";
import {DomesticTruckingService} from "../../interface-models/rfq_type_services/DomesticTrucking";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-domestic-trucking',
  templateUrl: './DomesticTrucking.html',
  styleUrls: []
})

export class DomesticTrucking {
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
      CBM: new FormControl<number|null>(null),
      maximum_per_item_weight_kg: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
      Equipment_Type: new FormControl<string>(''),

      Pickup_Country: new FormControl<string>(''),
      Delivery_Country: new FormControl<string>(''),
      Pickup_Address: new FormControl<string>(''),
      Delivery_Address: new FormControl<string>(''),

      Description: new FormControl<string>('')
    });
  }

  createRFQ(RFQForm: DomesticTruckingService)
  {
    let _body = {
      Module: "RFQs",
      data: {
        Service_Type: this.service_type_param,
        RFQ_Group: {
          id: this.rfq_group_id
        },
        ...RFQForm
      }
    }

    this.RFQService.NewRecord(_body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
