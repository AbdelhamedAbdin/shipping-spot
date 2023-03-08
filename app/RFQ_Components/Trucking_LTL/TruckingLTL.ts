// Built-in Angular Apps
import {Component, Injectable, OnInit} from '@angular/core';
import {getItemsOrNone, RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {TruckingLTLService} from "../../interface-models/rfq_type_services/TruckingLTL";
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";
import {AddRemoveItems} from "../add_remove_items";
import {compareWeights, DimensionalWeight, grossWeight, netWeight, numberOfPKGs} from "../../RFQ/Total_Calculations";
import {TotalQuantity} from "../../RFQ/Total_Quantity_Event";
import {TotalDimensionalWeight} from "../../RFQ/Total_Dimensional_Weight";
import {TotalNetWeight} from "../../RFQ/Total_Net_Weight";
import {TotalGrossWeight} from "../../RFQ/Total_Gross_Weight";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-trucking-ftl',
  templateUrl: './TruckingLTL.html',
  styleUrls: ["./TruckingLTL.css"]
})

export class TruckingLTL implements OnInit {
  service_type_param: any;
  rfq_group_id: any;
  formGroup: any;
  default_term: string = "-None-";
  terms: Array<string> = ["-None-", "Door to Door", "Port to Port", "Incoterm"];
  incoterms: any = ['-None-', 'EXW', 'FCA', 'FAS', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP'];
  setStatus: string = "";

  showPOL_POD = ['FAS', 'FOB', 'CFR', 'CIF'];
  showDeliveryAddress = ['CPT', 'CIP', 'DAP', 'DPU', 'DDP'];
  showPickupAddress = ["EXW", "FCA"];
  target_value: any;

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

  ngOnInit() {
    new TotalQuantity().listenToChangeEvent();
    new TotalDimensionalWeight(1000000).listenToChangeEvent();
    new TotalNetWeight().listenToChangeEvent();
    new TotalGrossWeight().listenToChangeEvent();
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

  submitStatus($event: any) {
    this.setStatus = $event.target.id;
  }

  changeStateEvent = (checked: any) => checked;

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
