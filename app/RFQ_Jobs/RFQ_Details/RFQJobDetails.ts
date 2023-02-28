// Built-in Angular Apps
import {Component, ElementRef, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RFQJobDetailsService} from "../../../services/CRMModules/RFQJobDetail";
import {RFQDetailsRestrictionService} from "../../../services/CRMModules/RFQDetailsRestriction";
import {GETSPQuotationByAccountService} from "../../../services/CRMModules/GETSPQuotationByAccount";
import { userLogged } from "../../../utils";

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
  data: any;
  data_keys: any;
  is_quoted: any;
  user_id: any;

  constructor(private router: Router, private routeParam: ActivatedRoute,
              private RFQJobDetails: RFQJobDetailsService,
              private RFQRestriction: RFQDetailsRestrictionService,
              private GETSPQuotationByAccount: GETSPQuotationByAccountService) {
    this.service_id = this.routeParam.snapshot.paramMap.get("id");
    this.user_id = new userLogged().parseStorage(localStorage).AccountID;

    // Get RFQ Job Details
    this.RFQJobDetails.GetRecordByID(this.service_id).subscribe(res => {
      this.service_type = res["data"][0].Service_Type;
      this.data_keys = Object.keys(res['data'][0]);

      res["data"].forEach((v: any) => {
        this.data = v;
      })

      const service_outlet_name = this.getServiceName(this.service_type);
      let service_outlet_object: any = {};

      service_outlet_object[service_outlet_name] = [this.service_type];
      // @ts-ignore
      this.router.navigate(['/rfq-jobs', this.service_id, {outlets: service_outlet_object}]);
    },
error => {
      if (error.status === 404) {
        this.router.navigate(['/rfq-jobs']);
      }
    })

    let quotation_id = this.RFQRestriction.GetRecordByBody({
      "ID":this.service_id,
      "Module":"RFQs",
      "Module_feilds":["Number_Of_Quotations"],
      "Raleted_list": [
          {"api_related":"SP_Quotations","Raleted_list_fields":["id"]}
      ]
    });

    quotation_id.subscribe(res => {
      res["raleted_list"].forEach((r: any) => {
        try {
          r["SP_Quotations"].filter((id: any) => {
            this.getAccountSp(id.id).subscribe(acc => {
              acc["record"].forEach((get_id: any) => {
                if (get_id.Service_Provider.id === this.user_id) {
                  this.is_quoted = true;
                  setTimeout(() => this.is_quoted = true, 2000);
                }
              })
            })
          })
        } catch (e) {return}
      })
    })
    // setTimeout(() => console.log(this.is_quoted), 5000);
  }

  getServiceName(service_name: any) {
    let service_value = service_name.replace(" - ", " ");
    let manipulate_name = service_value.split(" ");
    manipulate_name = manipulate_name.join("_");
    return manipulate_name;
  }

  showHiddenBox(outer_wrap: any, inner_wrap: any) {
    if (outer_wrap.style.visibility === 'visible') {
      outer_wrap.style.visibility = "hidden";
      inner_wrap.style.display = "none";
      setTimeout(() => outer_wrap.style.opacity = 0, 10);
      setTimeout(() => {
        inner_wrap.style.right = -150 + '%'
      }, 50);
      return;
    }

    outer_wrap.style.visibility = "visible";
    inner_wrap.style.display = "block";
    setTimeout(() => outer_wrap.style.opacity = .5, 10);
    setTimeout(() => {
      inner_wrap.style.right = 0 + '%'
    }, 50);
  }

  getAccountSp(id: any) {
    let service_provider_id = this.GETSPQuotationByAccount.GetRecordByBody({
      "ID":id,
      "Module":"SP_Quotations",
      "Module_feilds":["Service_Provider"],
      "Raleted_list": [{}]
    })
    return service_provider_id;
  }
}
