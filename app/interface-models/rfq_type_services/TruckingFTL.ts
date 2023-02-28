export interface TruckingFTLService {
  // RFQ Information
  Commodity: string;
  Note?: string;
  // General Information
  Shipping_Term: string;
  Incoterm: string;
  Need_Insurance?: boolean;
  Value_of_Goods?: number|null;
  Dangerous_Commodity?: boolean;
  Need_Temperature_Control?: boolean;
  Temperature?: number|null;
  Safety_Data_Sheet?: File|HTMLImageElement|null;
  // Pickup & Delivery
  Pickup_Country: string;
  Delivery_Country: string;
  Pickup_Address: string;
  Delivery_Address: string;
  POL_Port_of_Loading: string;
  POD_Port_of_Discharge: string;
}
