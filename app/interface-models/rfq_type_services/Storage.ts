export interface StorageService {
  // RFQ Information
  Request_Title: string;
  Commodity: string;
  Note?: string;
  // Details
  FCL_LCL: string;
  CBM: string;
  maximum_per_item_weight_kg: number;
  Equipment_Type: string;
  Space_Type: number;
  City: string;
  Preferred_District: string;
  Space: string;
  Storage_Type: string;
  // Duration
  From: Date;
  To: Date;
  // Total Items
  Total_Number_of_Packages: number;
  Total_Net_Weight: number;
  Total_Gross_weight: number;
  // description
  Description?: string;
}
