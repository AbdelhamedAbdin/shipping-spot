// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import { userLogged } from "../../utils";
import { RFQJobService } from "../../services/CRMModules/RFQJobs";
import { ActivatedRoute, Router } from "@angular/router";
import { provider_auth } from '../Auth/authentication'


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-job',
  templateUrl: './RFQJobs.html',
  styleUrls: ['./RFQJobs.css']
})

export class RFQJobs {
  rfq_jobs: any = [];
  account_id: any;
  user_type: string = "";

  // Add pagination
  page: number = 1;
  page_count: number = 1;
  pagination: Array<number> = [];
  get_params: any = null;

  range(start: number, end: number, step: number=0, offset: number=0) {

    let len = (Math.abs(end - start) + ((offset || 0) * 2)) / (step || 1) + 1;
    let direction = start < end ? 1 : -1;
    let startingPoint = start - (direction * (offset || 0));
    let stepSize = direction * (step || 1);
    try {
      return new Array(len).fill(0).map(function(_, index) {
        return startingPoint + (stepSize * index);
      });
    } catch (e) {
      return [1];
    }
  }

  constructor(private RFQJobServiceList: RFQJobService, private routeParam: ActivatedRoute, private router: Router) {
    this.account_id = new userLogged().parseStorage(localStorage).AccountID;
    this.user_type = new userLogged().parseStorage(localStorage).UserType;
    this.get_params = this.routeParam.snapshot.queryParams;

    provider_auth(this.user_type, this.router);

    // Get page number if not null
    if (this.get_params.hasOwnProperty("page")) {
      this.page = parseInt(this.get_params.page);
    }

    let payloads: any = {
      "ID": this.account_id,
      "Fields": ["Service_Type","Shipping_Term", "Commodity", "id"],
      "Page": this.page,
      "Per_Page": 3,
      "sort_by": "Created_Time",
      "sort_order": "desc"
    }

    const RFQJobList = this.RFQJobServiceList.NewRecord(payloads);

    RFQJobList.subscribe(res => {
      try {
        this.page_count = Math.ceil(res['Counter'] / payloads["Per_Page"]);

        // catch ZeroDevisionError
        if (this.page_count === 0) {
          this.page_count = 1;
        }

        this.rfq_jobs = res['data'];
      } catch (e) {
        this.rfq_jobs = null;
      }
      this.pagination = this.range(1, this.page_count);
    })
  }
}
