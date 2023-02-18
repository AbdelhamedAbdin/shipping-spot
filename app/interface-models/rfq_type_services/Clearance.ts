export interface ClearanceService {
  // RFQ Information
  Commodity: string;
  Note?: string;
  // Details
  HS_Code: number;
  Service_Operation: string;
  Service_Mode: string;
  Airport?: string;
  Landport?: string;
  Seaport?: string;
  Gross_Weight_kg?: number;
  Quantity?: number;
  CBM?: number;
  Shipment_Gross_Weight_kg?: number;
  Number_of_Trucks?: number;

  Pickup_Country: string;
  Delivery_Country: string;
  Pickup_Address: string;
  Delivery_Address: string;
}

export function ServiceModeData()
{
  let param = {
    Air: [
      {type: "number", formControlName: "CBM", class: "form-control mb-3", id: "CBM"},
      {type: "number", formControlName: "Quantity", class: "form-control mb-3", id: "Quantity"},
      {type: "number", formControlName: "Gross_Weight_kg", class: "form-control mb-3", id: "Gross_Weight_kg"}
    ],
    Land: [
      {type: "number", formControlName: "CBM", class: "form-control mb-3", id: "CBM"},
      {type: "number", formControlName: "Shipment_Gross_Weight_kg", class: "form-control mb-3", id: "Shipment_Gross_Weight_kg"},
      {type: "number", formControlName: "Number_of_Trucks", class: "form-control mb-3", id: "Number_of_Trucks"},
    ],
    Ocean: [
      {type: "number", formControlName: "CBM", class: "form-control mb-3", id: "CBM"}
    ]
  }
  return param;
}
