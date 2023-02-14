export interface InsuranceService {
  // RFQ Information
  Request_Title: string;
  Commodity: string;
  Note?: string;
  // Details
  Service_Mode: string;
  Policy_Type: string;
  Value: string;
  Country_Destination: string;
  Coverage: string;
  Country_Origin: string;
  FCL_LCL: string;
  CBM: string;
  maximum_per_item_weight_kg: number;
  Equipment_Type: string;
  Description?: string;
}
