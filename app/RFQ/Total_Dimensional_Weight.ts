import {TotalChargeableVariances} from "./Chargeable_Variances";

export class TotalDimensionalWeight {
  constant_number: number;

  constructor(constant_number: number) {
    this.constant_number = constant_number
  }

  // Read all selectors everytime keyup/click event occurs
  listenToChangeEvent()
  {
    window.addEventListener("keyup", () => setTimeout(() => this.getDimensionalWeightNumber(), 100));
    window.addEventListener("click", (e) => this.changeEntriesOnRemoveBtn(e));
  }

  // Update values when input is removed
  changeEntriesOnRemoveBtn(e: any)
  {
    let target = e.target as HTMLElement;

    if (target.className.match("btn-danger"))
    {
      this.getDimensionalWeightNumber();
      new TotalChargeableVariances().getChargeableVariances();
    }
  }

  // Quantity Summation Results
  getDimensionalWeightNumber()
  {
    let dimen: any = 0;
    let length: any = 0, width: any = 0, height: any = 0;
    const constant_number: number = this.constant_number;
    const parent_row = document.querySelectorAll(".items tbody tr");
    let total_dimensional = document.getElementById("total-dimensional") as HTMLInputElement;

    parent_row.forEach(child_elems => {
      child_elems.querySelectorAll("td input").forEach(target_input => {
        // @ts-ignore
        let value = target_input.value;

        if (target_input.className.match("length"))
        {
          length = value;
        }
        if (target_input.className.match("width"))
        {
          width = value;
        }
        if (target_input.className.match("height"))
        {
          height = value;
        }
      })
      dimen += (length * width * height) / constant_number;
    });

    total_dimensional.value = String(dimen);
    new TotalChargeableVariances().getChargeableVariances();
  }
}
