export interface InsuranceService {
  // RFQ Information
  Commodity: string;
  Note?: string;
  // Details
  Shipping_Mode: string;
  Policy_Type: string;
  Value: number;
  Country_Destination: string;
  Coverage: string;
  Country_Origin: string;
  Status: string;
}
