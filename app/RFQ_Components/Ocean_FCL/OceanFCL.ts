// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {getItemsOrNone, RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OceanFCLService} from "../../interface-models/rfq_type_services/OceanFCL";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";
import {AddRemoveItems} from "../add_remove_items";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-ocean-fcl',
  templateUrl: './OceanFCL.html',
  styleUrls: []
})

export class OceanFCL {
  service_type_param: any;
  rfq_group_id: any;

  formGroup: any;
  default_term: string = "-None-";
  terms: Array<string> = ["-None-", "Door to Door", "Port to Port", "Incoterm"];
  container_types: Array<string> = ["-None-", "Option 1", "Option 2"];
  incoterms: any = ['-None-', 'EXW', 'FCA', 'FAS', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP'];
  setStatus: string = "";

  showPOL_POD = ['FAS', 'FOB', 'CFR', 'CIF'];
  showDeliveryAddress = ['CPT', 'CIP', 'DAP', 'DPU', 'DDP'];
  showPickupAddress = ["EXW", "FCA"];
  target_value: string = "";

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

      Shipping_Term: new FormControl<string>(this.default_term),
      Incoterm: new FormControl<string>(this.default_term),
      Need_Insurance: new FormControl<boolean>(false),
      Value_of_Goods: new FormControl<number|null>(null),
      Dangerous_Commodity: new FormControl<boolean>(false),
      Need_Temperature_Control: new FormControl<boolean>(false),
      Temperature: new FormControl<number|null>(null),
      Safety_Data_Sheet: new FormControl<File|HTMLImageElement|null>(null),

      Pickup_Country: new FormControl<string>(''),
      Delivery_Country: new FormControl<string>(''),
      Pickup_Address: new FormControl<string>(''),
      Delivery_Address: new FormControl<string>(''),
      POL_Port_of_Loading: new FormControl<string>(''),
      POD_Port_of_Discharge: new FormControl<string>(''),
    });
    new AddRemoveItems().windowButtons();
  }

  createRFQ(RFQForm: OceanFCLService)
  {
    let item_list = getItemsOrNone(RFQForm, this);
    RFQBody(RFQForm, item_list, this);
  }

  changeStateEvent = (checked: any) => checked;

  submitStatus($event: any) {
    this.setStatus = $event.target.id;
  }

  showHideShippingTerm(shippingTerm: any) {
    return shippingTerm.value.slice(3) !== '-None-';
  }

  getIncotermValue($event: any) {
    let value = $event.target.value.slice(3);

    if (value.trim() === "-None-") {
      this.target_value = "-None-";
      return;
    }

    this.showPOL_POD.filter(data => {
      value.trim() === data ? this.target_value = "POL" : "";
    })

    this.showDeliveryAddress.filter(data => {
      value.trim() === data ? this.target_value = "DA" : "";
    })

    this.showPickupAddress.filter(data => {
      value.trim() === data ? this.target_value = "PA" : "";
    })
  }
}
