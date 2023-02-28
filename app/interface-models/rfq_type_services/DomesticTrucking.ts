export interface DomesticTruckingService {
  // RFQ Information
  Commodity: string;
  Note?: string;
  // Pickup & Delivery
  Pickup_Country: string;
  Delivery_Country: string;
  Pickup_Address: string;
  Delivery_Address: string;
  // Choose Truck
  Choose_Truck: string;
  Number_of_Trucks?: number;
  // Totals
  Total_Number_of_Packages: number;
  Total_CBM: number;
  Total_Gross_weight: number;
  Total_Net_Weight: number;
  Total_Chargeable_CBM: number;
}
