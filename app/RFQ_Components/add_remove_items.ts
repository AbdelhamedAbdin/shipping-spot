export class AddRemoveItems {
  windowButtons() {
    let $this = this;

    window.onclick = function (e) {
      let target = e.target;
      // @ts-ignore
      let $is_add = target.className.match('add-btn');
      // @ts-ignore
      let $is_remove = target.className.match('remove-btn');

      // event
      if ($is_add !== null) {
        $this.addButton(target);
      } else if ($is_remove !== null) {
        $this.removeButton(target);
      }
      let count_rm_btn = document.querySelectorAll(".remove-btn");
      let last_thead = document.querySelector("thead th:last-of-type");
      if (count_rm_btn.length === 0 && last_thead!.textContent === "Remove") {
        // @ts-ignore
        last_thead.remove();
      }
    }
  }

  addButton(btn: any)
  {
    let element_cloned = btn.closest("tr").cloneNode(true);
    let count_rm_btn = document.querySelectorAll(".remove-btn");
    let last_td = element_cloned.querySelector("td:last-of-type");

    // find remove-btn
    let find_rm_btn = last_td.querySelector("button").className.match("remove-btn");
    let btn_id = parseInt(btn.id);

    btn_id += 1;
    element_cloned.querySelector("button").id = btn_id;

    // remove "Trash heading" if length is 0
    if (count_rm_btn.length === 0) {
      let get_last_thead = document.querySelector("thead th:last-of-type") as HTMLTableElement;
      if (get_last_thead.textContent === "Remove") {
        get_last_thead.remove();
      }
    }

    // Ignore the first button and clone the next element instead
    if (count_rm_btn.length !== 0 && parseInt(element_cloned.id) === 1) {
      // @ts-ignore
      element_cloned = document.getElemetById("2").closest("tr").cloneNode(true);
    }

    if (find_rm_btn === null) {
      let create_btn_elem = document.createElement("button");
      let table_data = document.createElement("td");
      let create_thead = document.createElement("th");
      let main_thead = document.querySelector("thead th:last-of-type") as HTMLTableElement;

      create_thead.scope = "col";
      create_thead.textContent = "Remove";
      main_thead.after(create_thead);

      create_btn_elem.type = "button";
      create_btn_elem.classList.add("remove-btn", "btn", "btn-danger");
      create_btn_elem.textContent = "-";
      table_data.append(create_btn_elem);

      last_td.after(table_data);
    }

    btn.closest('tbody').append(element_cloned)
  }

  removeButton(btn: any)
  {
    btn.closest("tr").remove();
  }
}
