export class TotalQuantity {

  // Read all selectors everytime keyup/click event occurs
  listenToChangeEvent() {
    window.addEventListener("keyup", () => setTimeout(() => this.getQuantityEntries(), 100));
    window.addEventListener("click", (e) => this.changeEntriesOnRemoveBtn(e));
  }

  // Update values when input is removed
  changeEntriesOnRemoveBtn(e: any) {
    let target = e.target as HTMLElement;

    if (target.className.match("btn-danger")) {
      this.getQuantityEntries();
    }
  }

  // Quantity Summation Results
  getQuantityEntries() {
    let Q = 0;
    let collector = 0;
    let quantities = document.querySelectorAll(".quantities");
    let total_quantity = document.getElementById("total-quantity") as HTMLInputElement;

    quantities.forEach(v => {
      // @ts-ignore
      collector = parseInt(v.value);

      if (!isNaN(collector)) {
        Q += collector;
      } else {
        Q += 0;
      }
    });
    total_quantity.value = String(Q);
  }
}
