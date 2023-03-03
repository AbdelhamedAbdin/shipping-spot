// Built-in Angular Apps
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {RFQGroupService} from "../../../services/CRMModules/RFQGroup";
import {GetRFQGroupServices} from "../../../services/CRMModules/GetRFQGroups";
import {userLogged} from "../../../utils";


@Component({
  selector: 'app-page-title',
  templateUrl: './pageTitle.component.html',
  styleUrls: ['./pageTitle.component.css']
})

export class PageTitleComponent {
  title: string = "Page-Title";
  rfq_group: any = [];
  account_id: any;
  group_id: string = "";
  get_id_after_created: string = "";

  constructor(private RFQGroupService: RFQGroupService, private router: Router,
              private GetRFQGroupService: GetRFQGroupServices) {

    this.getAccountIdOrNone();
    this.SubscribeGroupID();
  }

  getAccountIdOrNone() {
    try {
      this.account_id = new userLogged().parseStorage(localStorage).AccountID;
    } catch (e) {
      this.account_id = "";
    }
  }

  SubscribeGroupID() {
    const RFQG = this.GetRFQGroupService.GetRecordByBody({
      "ID":this.account_id,
      "Module":"Accounts",
      "Module_feilds":["Account_Name","Shipping_Country"],
      "Raleted_list": [
          {"api_related":"RFQs","Raleted_list_fields":["id","Title", "Created_Time"]}
      ]
    });

    RFQG.subscribe((res: any) => {
      try {
        // get data or None
        this.rfq_group = res["raleted_list"][0]["RFQs"];
        if (this.rfq_group === 'No Data') {
          this.rfq_group = [];
        }
      } catch (e) {
        this.rfq_group = null;
      }

      if (this.rfq_group !== null) {
        if (this.rfq_group.length === 0) {
          return;
        }
        // to select group by id
        this.group_id = this.rfq_group[0].id;
      }
    });
  }

  createRfqGroup(rfq_group: {Title: string})
  {
    const page_title_selector = document.querySelector(".app-page-title #rfqg") as HTMLElement;
    const modal = document.querySelector(".modal-backdrop") as HTMLElement;
    const _body = {
      data: [{Title: rfq_group.Title, Account: {id: this.account_id}}],
      trigger: ["workflow"]
    };
    this.RFQGroupService.NewRecord(_body).subscribe(
      res => {
        this.get_id_after_created = res["data"][0].details.id;
      },
      error => {},
      () => {
        this.router.navigateByUrl("/rfq/" + this.get_id_after_created);
    });
    page_title_selector.style.display = "none";
    modal.style.display = "none";
  }

  groupId(id: string)
  {
    let selectGroup = document.getElementById("selectGroup");
    selectGroup?.setAttribute("data-groupID", id)
  }

  // Choose from the list
  selectGroup(event: any)
  {
    const group_id = event.target.dataset['groupid'];
    const page_title_selector = document.querySelector(".app-page-title #rfqg") as HTMLElement;
    const modal = document.querySelector(".modal-backdrop") as HTMLElement;

    this.router.navigateByUrl("/rfq/" + group_id);
    page_title_selector.style.display = "none";
    modal.style.display = "none";
    document.body.style.overflowY = "auto";
  }

}

