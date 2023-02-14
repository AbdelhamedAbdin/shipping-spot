export interface ClearanceService {
  // RFQ Information
  Request_Title: string;
  Commodity: string;
  Note?: string;
  // Details
  FCL_LCL: string;
  CBM: string;
  maximum_per_item_weight_kg: number;
  Equipment_Type: string;
  HS_Code: number;
  Service_Operation: string;
  Service_Mode: string;
  // description
  Description?: string;
}
