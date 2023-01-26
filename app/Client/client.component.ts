// Built-in Angular Apps
import { Component, Injectable, Input, Output } from '@angular/core';
import { rfq_group, rfqs } from "./demo";

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

  rfq_group = rfq_group;
  related_rfqs: any = [];
  RFQs = rfqs

  constructor() {}

  // close RFQ Details section
  resetRFQDetails()
  {
    this.related_rfqs = [];
  }

  RFQDetails(e: any)
  {
    let rfq_group_id = e.target.closest(".comment-row").querySelector(".group-id").dataset['pk'];
    rfq_group_id = parseInt(rfq_group_id);

    this.related_rfqs = this.RFQs.filter(rfq => {
      return rfq.rfq_group === rfq_group_id
    });
  }
}
