import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Services API
import { CRMRecordsService } from '../../DataAccess/CRMRecords.service'
import {DOMAIN} from "../../app/app.component";


@Injectable({
  providedIn: "root"
})

export class RFQJobService extends CRMRecordsService {

  constructor(private httpLead: HttpClient) {
    super(httpLead);
    this.Module = "";
    this.BaseURL = "https://" + DOMAIN + ".zohoapis.com/crm/v2/functions/get_rfq/actions/execute?auth_type=apikey&zapikey=1003.65ae4ee653d34665e6c303409c6762d7.f962cede729f9600a4ce03f8adfa57dd";
    this.UpdateURL();
  }
}
