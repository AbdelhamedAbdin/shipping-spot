// Built-in Angular Apps
import {Component, Injectable} from '@angular/core';
import {getItemsOrNone, RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {ClearanceService, ServiceModeData} from "../../interface-models/rfq_type_services/Clearance";
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";
import {AddRemoveItems} from "../add_remove_items";


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
  modes: Array<string> = ["-None-", "Air", "Ocean FCL", "Ocean LCL", "Land"];
  Airports: Array<string> = ["-None-", "Cairo Airport", "Alexandria Airport"];
  Landports: Array<string> = ["-None-", "option2"];
  Seaports: Array<string> = ["-None-", 'Portsaid East Port', 'Portsaid West Port', 'Damietta Port', 'Suez Port', 'Adabiya Port'];
  // children
  container_types: Array<string> = ["-None-", "Option1", "Option2"]

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
      Number_of_Trucks: new FormControl<number|null>(null),
    });

    new AddRemoveItems().windowButtons();
  }

  createRFQ(RFQForm: ClearanceService)
  {
    let item_list = getItemsOrNone(RFQForm, this);
    RFQBody(RFQForm, item_list, this);
  }
}
