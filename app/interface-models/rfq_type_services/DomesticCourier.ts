export interface DomesticCourierService {
  // RFQ Information
  Commodity: string;
  Note?: string;
  // Pickup & Delivery
  Pickup_Country: string;
  Delivery_Country: string;
  Pickup_Address: string;
  Delivery_Address: string;
  // Total Items
  Total_Number_of_Packages: number;
  Total_Net_Weight: number;
  Total_Gross_weight: number;
}
