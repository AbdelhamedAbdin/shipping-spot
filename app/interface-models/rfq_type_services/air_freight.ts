export interface Air_Freight {
  Request_Title: string;
  Commodity: string;
  FCL_LCL: string;
  Note: string;
  CBM: string;
  Equipment_Type: string;
  Shipping_Term: string;
  Incoterm: string;
  Need_Insurance?: boolean;
  Dangerous_Commodity?: boolean;
  Value_of_Goods: string;
  Pickup_Country: string;
  Delivery_Country: string;
  Pickup_Address: string;
  Delivery_Address: string;
  maximum_per_item_weight_kg: number;
  Total_Number_of_Packages: number;
  Total_Net_Weight: number;
  Total_Gross_weight: number;
}
