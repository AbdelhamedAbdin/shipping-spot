export interface RFQ {
  service_type: string;
  rfq_group: number;
  request_title: string;
  request_status?: string | "New";
}
