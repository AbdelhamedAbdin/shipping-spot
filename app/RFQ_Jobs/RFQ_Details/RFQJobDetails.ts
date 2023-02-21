// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RFQJobDetailsService} from "../../../services/CRMModules/RFQJobDetail";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-rfq-job-details',
  templateUrl: './RFQJobDetails.html',
  styleUrls: ['./RFQJobDetails.css']
})

export class RFQJobDetails {
  title = "RFQ Details";
  service_id: any = "";
  service_type: any;

  constructor(private router: Router, private routeParam: ActivatedRoute, private RFQJobDetails: RFQJobDetailsService) {
    this.service_id = this.routeParam.snapshot.paramMap.get("id");

    this.RFQJobDetails.GetRecordByID(this.service_id).subscribe(res => {
      this.service_type = res["data"][0].Service_Type;
      this.router.navigate(['/rfq-jobs', this.service_id, this.service_type]);
    },
error => {
      if (error.status === 404) {
        this.router.navigate(['/rfq-jobs']);
      }
    })
  }
}
