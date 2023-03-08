// Built-in Angular Apps
import {Component, Injectable, OnInit} from '@angular/core';
import {ListDraftService} from "../../services/CRMModules/ListDraft.service";
import {userLogged} from "../../utils";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {SpinnerComponent} from "../popup/spinner/Spinner.component";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-client',
  templateUrl: './Draft.component.html',
  styleUrls: ['./Draft.component.css']
})

export class DraftComponent implements OnInit {
  title = "Draft";
  account_id: string = new userLogged().parseStorage(localStorage).AccountID;
  drafts: any;
  edit_icon = faPenToSquare;
  remove_icon = faTrash;
  message: string = "";
  spinner: any = new SpinnerComponent();

  constructor(private ListDraft: ListDraftService, private router: Router) {
    this.getDrafts(this.account_id).subscribe(res => {
      this.spinner.endSpinnerLoading();
      this.drafts = res["data"];
    })
  }

  ngOnInit() {
    this.spinner.startSpinnerLoading();
  }

  getDrafts(account_id: string) {
    return this.ListDraft.GetRecordByID("search?criteria=((Client:equals:" + account_id +")and(Status:equals:Draft))")
  }

  editRFQ(service_type: string, rfq_group_id: string, rfq_id: string) {
    let service_outlet_object: any = {};
    const service_outlet_name = this.getServiceName(service_type);

    service_outlet_object[service_outlet_name] = [service_outlet_name];
    const option_param = service_type;

    this.router.navigate(['/', 'rfq', rfq_group_id, {
      outlets: service_outlet_object,
    }], {queryParams: {service_type: option_param, edit: true, rfq_ID: rfq_id}});
  }

  removeRFQ(rfq_id: string) {
    this.ListDraft.DeleteRecord(rfq_id).subscribe();
    this.message = `${rfq_id}, has been created`;
    this.router.navigateByUrl("/draft");
  }

  getServiceName(service_name: any) {
    let service_value = service_name.replace(" - ", " ");
    let manipulate_name = service_value.split(" ");
    const get_manipulated_name = manipulate_name.join("_");
    return get_manipulated_name;
  }
}


// $(document).ready(function(){
// 	// Activate tooltip
// 	$('[data-toggle="tooltip"]').tooltip();
//
// 	// Select/Deselect checkboxes
// 	var checkbox = $('table tbody input[type="checkbox"]');
// 	$("#selectAll").click(function(){
// 		if(this.checked){
// 			checkbox.each(function(){
// 				this.checked = true;
// 			});
// 		} else{
// 			checkbox.each(function(){
// 				this.checked = false;
// 			});
// 		}
// 	});
// 	checkbox.click(function(){
// 		if(!this.checked){
// 			$("#selectAll").prop("checked", false);
// 		}
// 	});
// });
