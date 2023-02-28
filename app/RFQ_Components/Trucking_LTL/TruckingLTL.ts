// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {getItemsOrNone, RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {TruckingLTLService} from "../../interface-models/rfq_type_services/TruckingLTL";
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";
import {AddRemoveItems} from "../add_remove_items";
import {compareWeights, DimensionalWeight, grossWeight, netWeight, numberOfPKGs} from "../../RFQ/Total_Calculations";


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

  createRFQ(RFQForm: TruckingLTLService)
  {
    let item_list = getItemsOrNone(RFQForm, this);
    RFQForm.Total_Number_of_Packages = numberOfPKGs(item_list);
    RFQForm.Total_CBM = DimensionalWeight(item_list, 1000000);
    RFQForm.Total_Net_Weight = netWeight(item_list);
    RFQForm.Total_Gross_weight = grossWeight(item_list);
    RFQForm.Total_Chargeable_CBM = compareWeights(RFQForm.Total_Gross_weight, RFQForm.Total_CBM);
    RFQBody(RFQForm, item_list, this);
  }

  changeStateEvent = (checked: any) => checked;
}
