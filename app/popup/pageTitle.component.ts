// Built-in Angular Apps
import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import {RFQGroupService} from "../../services/CRMModules/RFQGroup";
import {userLogged} from "../../utils";


@Component({
  selector: 'app-page-title',
  templateUrl: './pageTitle.component.html',
  styleUrls: ['./pageTitle.component.css']
})

export class PageTitleComponent {
  title: string = "Page-Title";
  rfq_group: any;
  account_id: any;
  group_id: string = "";
  get_id_after_created: string = "";

  constructor(private RFQGroupService: RFQGroupService, private router: Router) {
    try {
      this.account_id = new userLogged().parseStorage(localStorage).AccountID;
    } catch (e) {
      this.account_id = "";
    }

    const RFQG = this.RFQGroupService.GetRecordByID("search?criteria=(Account:equals:" + this.account_id + ")");
    RFQG.subscribe(res => {
      this.rfq_group = res["data"];

      // to select group by id
      this.group_id = this.rfq_group[0].id;
    })
  }

  createRfqGroup(rfq_group: {Title: string})
  {
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
  }

  groupId(id: string) {
    let selectGroup = document.getElementById("selectGroup");
    selectGroup?.setAttribute("data-groupID", id)
  }

  // Choose from the list
  selectGroup(event: any) {
    const group_id = event.target.dataset['groupid'];
    this.router.navigate(["rfq", group_id]);
  }

}

