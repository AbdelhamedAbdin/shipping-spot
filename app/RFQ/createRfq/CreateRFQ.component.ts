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
    "International Courier",
    "Domestic Trucking",
    "Domestic Courier",
    "Custom Clearance",
    "Storage",
    "Packing",
    "Fumigation",
    "Fumigation",
    "Handling Equipment",
    "Insurance"
  ]
  default_service: string = "-- None --";
  option_choiced: boolean = false;


  constructor(private RFQGroupService: RFQGroupService, private router: Router, private routeParam: ActivatedRoute) {
    this.account_id = new userLogged().parseStorage(localStorage).AccountID;
    this.rfq_group_id = this.routeParam.snapshot.paramMap.get('id');

    this.RFQGroupService.GetRecordByID(this.rfq_group_id).subscribe(res => {
      const payload_data = res["data"][0];
      this.rfq_group_name = payload_data.Title;
    })
  }

  displayFields(option: any)
  {
    const service_outlet_name = this.getServiceName(option);
    let service_outlet_object: any = {};
    // e.g {Air_Freight: ['Air_Freight']}
    service_outlet_object[service_outlet_name] = [service_outlet_name];

    if (option === this.default_service) {
      this.option_choiced = false;
      this.router.navigate(['/', 'rfq', this.rfq_group_id]);
    } else {
      this.option_choiced = true;
      this.router.navigate(['/', 'rfq', this.rfq_group_id]);
      setTimeout(() => {
        this.router.navigate(['/', 'rfq', this.rfq_group_id, { outlets: service_outlet_object}]);
      }, 100)
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
