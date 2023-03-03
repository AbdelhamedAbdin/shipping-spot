import {FlashComponent} from "../flash_message/Flash.component";

export function createQuote($this: any, SPQuote: any, RFQ_Type: string) {
  let payload = {
    data: [
      {
        RFQ: {
          id: $this.getRFQParamID
        },
        Service_Provider: {
          id: $this.account_id
        },
        ...SPQuote,
        Status: "Pending",
        RFQ_Type: RFQ_Type
      }
    ],
    trigger: ['workflow']
  }

  let flash_message = new FlashComponent();

  $this.SPQuoationService.NewRecord(payload).subscribe((res: any) => {
    $this.router.navigateByUrl('/rfq-jobs');
  });
}
