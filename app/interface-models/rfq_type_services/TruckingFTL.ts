export interface TruckingFTLService {
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
  // description
  Description?: string;
}


export interface TruckingFTLItems {
  Net_Weight_kg: number;
  Gross_Weight_kg: number;
  Number_of_Trucks: number;
}
