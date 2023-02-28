import { HttpClient } from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
// Services API
import { CRMRecordsService } from '../../DataAccess/CRMRecords.service'

@Injectable({
  providedIn: "root"
})

export class UpdateSPQuotationService extends CRMRecordsService {
  constructor(private httpLead: HttpClient) {
    super(httpLead);
    this.Module = "SP_Quotations";
    this.UpdateURL();
  }
}
