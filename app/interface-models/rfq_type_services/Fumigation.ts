export interface FumigationService {
  // RFQ Information
  Commodity: string;
  Note?: string;
  // Details
  City: string;
  // Totals
  Total_Number_of_Packages: number;
  Total_CBM: number;
  Total_Gross_weight: number;
}
