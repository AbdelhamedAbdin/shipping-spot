import {RFQGroup} from "../interface-models/group_interface";
import {RFQ} from "../interface-models/RFQs";

let rfq_group: RFQGroup[] = [
    {
      id: 1,
      title: "Needed to charge goods to China",
      accountID: "5031882000000559103"
    },
    {
      id: 2,
      title: "I need to customs clearance asap",
      accountID: "5031882000000559103"
    }
]

let rfqs: RFQ[] = [
  {
    service_type: "Air Freight",
    rfq_group: 1,
    request_title: "Can achieve this within 10 days"
  },
  {
    service_type: "Ocean Freight",
    rfq_group: 1,
    request_title: "I have my own ship with the lowest cost in the market"
  },
  {
    service_type: "Custom Clearance",
    rfq_group: 2,
    request_title: "you can get that mission after opening the contract with the low cost"
  }
]

export { rfq_group, rfqs }
