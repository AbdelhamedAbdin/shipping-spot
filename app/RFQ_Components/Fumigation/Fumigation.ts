// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {getItemsOrNone, RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {FumigationService} from "../../interface-models/rfq_type_services/Fumigation";
import {AddRemoveItems} from "../add_remove_items";
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-fumigation',
  templateUrl: './Fumigation.html',
  styleUrls: []
})

export class Fumigation {
  service_type_param: any;
  rfq_group_id: any;

  formGroup: any;

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

      City: new FormControl<string>(''),
    });

    new AddRemoveItems().windowButtons();
  }

  createRFQ(RFQForm: AirFreightService)
  {
    let item_list = getItemsOrNone(RFQForm, this, false);
    RFQBody(RFQForm, item_list, this);
  }
}
