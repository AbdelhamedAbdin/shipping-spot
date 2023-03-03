export class TotalChargeableVariances {
  getChargeableVariances() {
    let total_gross_weight = document.getElementById("total-gross-weight") as HTMLInputElement;
    let total_dimensional = document.getElementById("total-dimensional") as HTMLInputElement;
    let total_chargeable_weight = document.getElementById("total-chargeable-weight") as HTMLInputElement;
    let result: string;

    if (total_gross_weight.value > total_dimensional.value) {
      result = total_gross_weight.value;
    } else {
      result = total_dimensional.value;
    }
    total_chargeable_weight.value = result;
    return;
  }
}
