// Built-in Angular Apps
import { Component, Injectable, Input, Output } from '@angular/core';
import { rfq_group, rfqs } from "./demo";
import { ContactsService } from "../../services/CRMModules/Contacts"
import { RFQGroupService } from "../../services/CRMModules/RFQGroup";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent {
  title = "Client";
  @Input() user_request: any;
  contact_payloads: string = "";

  rfq_group = rfq_group;
  related_rfqs: any = [];
  RFQs = rfqs

  constructor(private contactsService: ContactsService, private RFQ_Group: RFQGroupService, private http: HttpClient) {
    const user_payloads = JSON.parse(localStorage.user_payloads);
    const userID = user_payloads.userID;

    const contact_service = this.contactsService.GetRecordByID(userID);
    contact_service.subscribe(res => {
      this.contact_payloads = res["data"];
    });

    // const RFQG = this.RFQ_Group.GetRecordByID("search?criteria=(Account:equals:5031882000000559103)");
  }

  // close RFQ Details section
  resetRFQDetails() {this.related_rfqs = []}

  RFQDetails(e: any)
  {
    let rfq_group_id = e.target.closest(".comment-row").querySelector(".group-id").dataset['pk'];
    rfq_group_id = parseInt(rfq_group_id);

    this.related_rfqs = this.RFQs.filter(rfq => {
      return rfq.rfq_group === rfq_group_id;
    });
  }
}
