import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Services API
import { CRMRecordsService } from '../../DataAccess/CRMRecords.service'
import {DOMAIN} from "../../app/app.component";


@Injectable({
  providedIn: "root"
})

export class ListDraftService extends CRMRecordsService {

  constructor(private httpLead: HttpClient) {
    super(httpLead);
    this.Module = "RFQs";
    this.UpdateURL();
  }
}

