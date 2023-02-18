export function selectServiceType($this: any) {
  // @ts-ignore
  window.onchange = function (e) {
    const target = e.target;
    // @ts-ignore
    const type_service = target.value, type_service_name = target.name;

    if (type_service_name === "Service_Type") {
      type_service !== "-None-" ? $this.is_select = true : $this.is_select = false;
    }
  }
}

function createRFQ(RFQForm: any, hasItem: boolean = true, $this: any)
{
  // @ts-ignore
  let items = RFQForm.child; // store nested child
  Reflect.deleteProperty(RFQForm, "child"); // remove child
  items["Type"] = $this.service_type_param; // add Type key to service type
  let add_item: any = [{}];

  add_item = {
    Lookup_name_in_module_related: "RFQ",
    Module_related: "Items",
    data_related: [items]
  }

  let _body = {
    Module: "RFQs",
    data: {
      Service_Type: $this.service_type_param,
      RFQ_Group: {
        id: $this.rfq_group_id
      },
      ...RFQForm
    },
    ...add_item
  }

  console.log(_body);

  $this.RFQService.NewRecord(_body).subscribe((res: any) => {
    console.log(res);
  });
}
