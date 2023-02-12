export function selectServiceType($this: any) {
  // @ts-ignore
  window.onchange = function (e) {
    const target = e.target;
    // @ts-ignore
    const type_service = target.value, type_service_name = target.name;

    if (type_service_name === "Service_Type") {
      type_service !== "-- None --" ? $this.is_select = true : $this.is_select = false;
    }
  }
}
