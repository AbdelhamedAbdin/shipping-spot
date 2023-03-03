import {TotalChargeableVariances} from "./Chargeable_Variances";

export class TotalGrossWeight {

  // Read all selectors everytime keyup/click event occurs
  listenToChangeEvent() {
    window.addEventListener("keyup", () => setTimeout(() => this.getGrossWeightEntries(), 100));
    window.addEventListener("click", (e) => this.changeEntriesOnRemoveBtn(e));
  }

  // Update values when input is removed
  changeEntriesOnRemoveBtn(e: any) {
    let target = e.target as HTMLElement;

    if (target.className.match("btn-danger")) {
      this.getGrossWeightEntries();
      new TotalChargeableVariances().getChargeableVariances()
    }
  }

  // Quantity Summation Results
  getGrossWeightEntries() {
    let G = 0;
    let collector = 0;
    let grosses = document.querySelectorAll(".gross-weight");
    let total_gross_weight = document.getElementById("total-gross-weight") as HTMLInputElement;

    grosses.forEach(v => {
      // @ts-ignore
      collector = parseInt(v.value);

      if (!isNaN(collector)) {
        G += collector;
      } else {
        G += 0;
      }
    });
    total_gross_weight.value = String(G);
    new TotalChargeableVariances().getChargeableVariances();
  }
}
