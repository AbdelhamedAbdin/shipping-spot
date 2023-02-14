// Built-in Angular Apps
import {Component, Injectable, Input} from '@angular/core';
import { RFQGroupService } from "../../../services/CRMModules/RFQGroup";
import { userLogged } from "../../../utils";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-report',
  templateUrl: './CreateRFQ.component.html',
  styleUrls: ['./CreateRFQ.component.css']
})

export class CreateRFQComponent {
  title = "RFQ";
  related_rfqs: any = [];
  account_id: any;
  rfq_group_id: any;
  rfq_group_name: any;
  Type_Services: any = [
    "Air Freight",
    "Ocean Freight - FCL",
    "Ocean Freight - LCL",
    "International Trucking - FTL",
    "International Trucking - LTL",
    "International Clearance",
    "Domestic Trucking",
    "Domestic Clearance",
    "Custom Clearance",
    "Storage",
    "Packing",
    "Fumigation",
    "Handling Insurance",
    "Insurance"
  ]
  default_service: string = "-- None --";
  option_choiced: boolean = false;

  constructor(private RFQGroupService: RFQGroupService, private router: Router, private routeParam: ActivatedRoute) {
    const params = this.routeParam.snapshot.queryParams;
    this.account_id = new userLogged().parseStorage(localStorage).AccountID;
    this.rfq_group_id = this.routeParam.snapshot.paramMap.get('id');

    // Get the current parameter
    if (params.hasOwnProperty('service_type')) {
      this.default_service = params.service_type;
    }

    this.RFQGroupService.GetRecordByID(this.rfq_group_id).subscribe(res => {
      const payload_data = res["data"][0];
      this.rfq_group_name = payload_data.Title;
    })
  }

  displayFields(option: any)
  {
    const service_outlet_name = this.getServiceName(option);
    let service_outlet_object: any = {};

    service_outlet_object[service_outlet_name] = [service_outlet_name]; // e.g {OceanLCL: ['OceanLCL']}
    const option_param = option.slice(3); // slice string

    if (option === this.default_service) {
      this.option_choiced = false;
      this.router.navigate(['/', 'rfq', this.rfq_group_id]);
    } else {
      this.option_choiced = true;
      this.router.navigate(['/', 'rfq', this.rfq_group_id], {
        queryParams: {service_type: option_param}
      });

      setTimeout(() => {
        this.router.navigate(['/', 'rfq', this.rfq_group_id, {
          outlets: service_outlet_object,
        }], {queryParams: {service_type: option_param}});
      }, 50);
    }
  }

  getServiceName(service_name: any) {
    let service_value = service_name.replace(" - ", " ");
    let manipulate_name = service_value.split(" ");
    const remove_first_char = manipulate_name.slice(1);
    const get_manipulated_name = remove_first_char.join("_");
    return get_manipulated_name;
  }
}
