// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import { selectServiceType } from "../run_event";
// ShippingSpot Components
import { Air_Freight } from "../../interface-models/rfq_type_services/air_freight";
import { RFQsService } from "../../../services/CRMModules/RFQs";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-air-freight',
  templateUrl: './AirFreight.html',
  styleUrls: []
})

export class AirFreight {
  service_type_param: any = null;

  constructor(private RFQService: RFQsService, private currentRoute: ActivatedRoute) {
    selectServiceType(this);
    // Get real name of the service
    this.currentRoute.queryParams.subscribe(res => {
      this.service_type_param = res.service_type
    })
  }

  createRFQ(RFQForm: Air_Freight)
  {
    const rfq_group_id = this.currentRoute.parent?.snapshot.params.id;
    const data = RFQForm;

    let _body = {
      Module: "RFQs",
      data: {
        Service_Type: this.service_type_param,
        RFQ_Group: {
          id: rfq_group_id
        },
        ...data
      }
    }

    this.RFQService.NewRecord(_body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
