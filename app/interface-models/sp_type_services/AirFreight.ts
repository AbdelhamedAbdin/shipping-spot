export default interface AirFreightService
{
  Price: number;
  All_In_Price: number;
  Price_Breakdown: string;
  Transit_Time_days: number;
  Free_Time_days: number;
  Carrier: string;
  Credit_Terms: string;
  Flight_Schedule: string;
  POL: string;
  POD: string;
  Price_Validity: Date;
  Note: string;
  Credit_Amount: number;
  Credit_Period_days: number;
  Terms_Conditions: string;
}
