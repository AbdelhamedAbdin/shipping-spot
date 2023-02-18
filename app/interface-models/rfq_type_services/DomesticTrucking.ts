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
  Truck_Type?: string;
  Number_of_Trucks?: number;
}
