export interface TruckingLTLService {
  // RFQ Information
  Request_Title: string;
  Commodity: string;
  Note?: string;
  // Details
  FCL_LCL: string;
  CBM: string;
  maximum_per_item_weight_kg: number;
  Equipment_Type: string;
  // General Information
  Shipping_Term: string;
  Incoterm: string;
  Need_Insurance?: boolean;
  Value_of_Goods: string;
  Need_Temperature_Control: boolean;
  Temperature: string;
  Dangerous_Commodity?: boolean;
  // Pickup & Delivery
  Pickup_Country: string;
  Delivery_Country: string;
  Pickup_Address: string;
  Delivery_Address: string;
  POL_Port_of_Loading: string;
  POD_Port_of_Discharge: string;
  // Total Items
  Total_Number_of_Packages: number;
  Total_Net_Weight: number;
  Total_Gross_weight: number;
  // description
  Description?: string;
}


// Nested Items
export interface TruckingLTLItems {
    Quantity: number;
    Length_cm: number;
    Width_cm: number;
    Height_cm: number;
    Net_Weight_kg: number;
    Gross_Weight_kg: number;
}
