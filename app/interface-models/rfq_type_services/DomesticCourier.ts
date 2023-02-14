export interface DomesticCourierService {
  // RFQ Information
  Request_Title: string;
  Commodity: string;
  Note?: string;
  // Details
  FCL_LCL: string;
  CBM: string;
  maximum_per_item_weight_kg: number;
  Equipment_Type: string;
  // Pickup & Delivery
  Pickup_Country: string;
  Delivery_Country: string;
  Pickup_Address: string;
  Delivery_Address: string;
  // Total Items
  Total_Number_of_Packages: number;
  Total_Net_Weight: number;
  Total_Gross_weight: number;
  // description
  Description?: string;
}
