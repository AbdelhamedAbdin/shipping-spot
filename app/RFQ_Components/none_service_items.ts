import { RFQsService } from "../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";

export class createRFQs {
  service_type_param: any;
  constructor(private RFQService: RFQsService, private currentRoute: ActivatedRoute) {}

  createRFQ(RFQForm: any)
  {
    const rfq_group_id = this.currentRoute.parent?.snapshot.params.id;
    const data = RFQForm;

    let _body = {
      Module: "RFQs",
      data: {
        Service_Type: this.service_type_param,
        RFQ_Group: {
          id: rfq_group_id
        },
        ...data
      }
    }

    this.RFQService.NewRecord(_body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
