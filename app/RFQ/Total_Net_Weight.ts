export class TotalNetWeight {

  // Read all selectors everytime keyup/click event occurs
  listenToChangeEvent() {
    window.addEventListener("keyup", () => setTimeout(() => this.getNetWeightEntries(), 100));
    window.addEventListener("click", (e) => this.changeEntriesOnRemoveBtn(e));
  }

  // Update values when input is removed
  changeEntriesOnRemoveBtn(e: any) {
    let target = e.target as HTMLElement;

    if (target.className.match("btn-danger")) {
      this.getNetWeightEntries();
    }
  }

  // Quantity Summation Results
  getNetWeightEntries() {
    let N = 0;
    let collector = 0;
    let net_weight = document.querySelectorAll(".net-weight");
    let total_net_weight = document.getElementById("total-net-weight") as HTMLInputElement;

    net_weight.forEach(v => {
      // @ts-ignore
      collector = parseInt(v.value);

      if (!isNaN(collector)) {
        N += collector;
      } else {
        N += 0;
      }
    });
    total_net_weight.value = String(N);
  }
}
