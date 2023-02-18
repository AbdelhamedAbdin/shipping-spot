export interface StorageService {
  // RFQ Information
  Commodity: string;
  Note?: string;
  // Details
  Space_Type: string;
  City: string;
  Preferred_District: string;
  Space: number;
  Storage_Type: string;
  // Duration
  From: Date;
  To: Date;
  // Total Items
  Total_Number_of_Packages: number;
  Total_Net_Weight: number;
  Total_Gross_weight: number;
}
