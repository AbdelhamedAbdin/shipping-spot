// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {getItemsOrNone, RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {InsuranceService} from "../../interface-models/rfq_type_services/Insurance";
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";
import {AddRemoveItems} from "../add_remove_items";


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
  setStatus: string = "";

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
      Status: new FormControl<string>(''),

      Shipping_Mode: new FormControl<string>(this.default_term),
      Country_of_Origin: new FormControl<string>(this.default_term),
      Country_of_Destination: new FormControl<string>(this.default_term),
      Coverage: new FormControl<string>(this.default_term),
      Policy_Type: new FormControl<string>(this.default_term),
      Value: new FormControl<number|null>(null, [Validators.pattern(/d+/g)]),
    });

    new AddRemoveItems().windowButtons();
  }

  createRFQ(RFQForm: InsuranceService)
  {
    let item_list = getItemsOrNone(RFQForm, this);
    RFQBody(RFQForm, item_list, this);
  }

  submitStatus($event: any) {
    this.setStatus = $event.target.id;
  }
}
