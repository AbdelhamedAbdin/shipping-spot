import {userLogged} from "../../utils";


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

// Place Children inside items
export function getItemsOrNone(RFQForm: any, $this: any, hasItem: boolean = true) {
  Reflect.deleteProperty(RFQForm, "child"); // remove child

  if (!hasItem) {
    return [{}];
  }

  let
    item_map: any = {},
    item_list: object[] = [],
    get_inputs = "",
    form_childs = document.querySelectorAll(".child-form"),
    input_elem: any;

  form_childs.forEach((child: any) => {
    get_inputs = child.querySelectorAll("input, select");

    for (let i = 0; i < get_inputs.length; i++)
    {
      input_elem = get_inputs[i];
      item_map[input_elem.getAttribute('formControlName')] = input_elem.value;
    }

    item_map["Type"] = $this.service_type_param;
    item_list.push(item_map);
    item_map = {}; // reset item_map
  })
  return item_list;
}

// RFQ Structure
export function RFQBody(RFQForm: any, item_list: any, $this: any,
                        edited: boolean=false, RFQ_ID: string="") {
  let user_type = new userLogged().parseStorage(localStorage).UserType;
  let user_id = new userLogged().parseStorage(localStorage).AccountID;

  let _body = {
    Module: "RFQs",
    ID: RFQ_ID,
    Method: "PUT",
    data: {
      Service_Type: $this.service_type_param,
      RFQ_Group: {
        id: $this.rfq_group_id
      },
      ...RFQForm,
      User_Type: user_type,
      Client: user_id
    },
    Lookup_name_in_module_related: "RFQ",
    Module_related: "Items",
    data_related: item_list
  }

  if (!edited) {
    console.log("New Record");
    // @ts-ignore
    delete _body.ID;
    // @ts-ignore
    delete _body.Method;
    $this.RFQService.NewRecord(_body).subscribe((res: any) => {
      console.log("Status (201) OK: ", res)
    }, (error: any) => {console.log("Status (400): ", error)}, () => {
      $this.router.navigate(["/"]);
    });
  } else {
    console.log("Update Record");
    let status_type = _body.data.Status;

    $this.UpdateRFQ.GetRecordByBody(_body).subscribe((res: any) => {
      console.log(res);
    });

    if (status_type === "New") {
      $this.router.navigate(["/"]);
    } else {
      $this.router.navigate(["/", "draft"]);
    }
  }
}
