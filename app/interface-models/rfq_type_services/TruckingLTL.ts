export interface TruckingLTLService {
  // RFQ Information
  Commodity: string;
  Note?: string;
  // General Information
  Shipping_Term?: string;
  Incoterm?: string;
  Need_Insurance?: boolean;
  Value_of_Goods?: number|null;
  Dangerous_Commodity?: boolean;
  Need_Temperature_Control?: boolean;
  Temperature?: number|null;
  Safety_Data_Sheet?: File|HTMLImageElement|null;
  // Pickup & Delivery
  Pickup_Country: string;
  Delivery_Country: string;
  Pickup_Address?: string;
  Delivery_Address?: string;
  POL_Port_of_Loading?: string;
  POD_Port_of_Discharge?: string;
  // Total Items
  Total_Number_of_Packages: number;
  Total_Net_Weight: number;
  Total_Gross_weight: number;
  Total_CBM: number;
  Total_Chargeable_CBM: number;
  Status: string;
}
