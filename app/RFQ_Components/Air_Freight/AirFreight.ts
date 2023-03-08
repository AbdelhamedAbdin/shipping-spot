// Built-in Angular Apps
import {Component, Injectable, OnInit} from '@angular/core';
import {RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
// ShippingSpot Components
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";
import {ActivatedRoute, Router} from "@angular/router";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {AddRemoveItems} from '../add_remove_items';
import {getItemsOrNone} from '../service_handlers';
import {compareWeights, DimensionalWeight, grossWeight, netWeight, numberOfPKGs} from "../../RFQ/Total_Calculations";
import {TotalQuantity} from '../../RFQ/Total_Quantity_Event';
import {TotalDimensionalWeight} from '../../RFQ/Total_Dimensional_Weight';
import {TotalNetWeight} from "../../RFQ/Total_Net_Weight";
import {TotalGrossWeight} from "../../RFQ/Total_Gross_Weight";
import {RFQGroupService} from "../../../services/CRMModules/RFQGroup";
import {SearchRecordsService} from "../../../services/CRMModules/SearchRecords";
import {SpinnerComponent} from "../../popup/spinner/Spinner.component";
import {UpdateRFQService} from "../../../services/CRMModules/UpdateRFQ.service";
import {RFQItemRecordsService} from "../../../services/CRMModules/RFQItemRecords.service";
import {BehaviorSubject, Observable, Observer} from "rxjs";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-air-freight',
  templateUrl: './AirFreight.html',
  styleUrls: ["./AirFreight.css"]
})

export class AirFreight implements OnInit {
  service_type_param: any;
  rfq_group_id: any;
  rfq_id: string = "";
  last_input_values: any;
  signals: boolean = false;
  params: any;
  RFQIDParam: string = "";
  item_list: any;
  edit_mode: boolean = false;
  observer = new BehaviorSubject([]);
  observer$ = this.observer.asObservable();

  spinner = new SpinnerComponent();

  formGroup: any;
  default_term: string = "-None-";
  terms: Array<string> = ["-None-", "Door to Door", "Port to Port", "Incoterm"];
  incoterms: any = ['-None-', 'EXW', 'FCA', 'FAS', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP'];
  setStatus: string = "";

  showPOL_POD = ['FAS', 'FOB', 'CFR', 'CIF'];
  showDeliveryAddress = ['CPT', 'CIP', 'DAP', 'DPU', 'DDP'];
  showPickupAddress = ["EXW", "FCA"];
  target_value: string = "";

  constructor(private RFQService: RFQsService,
              private currentRoute: ActivatedRoute,
              private SearchRFQService: SearchRecordsService,
              private UpdateRFQ: UpdateRFQService,
              private router: Router,
              private RFQItemRecords: RFQItemRecordsService) {
    this.params = this.currentRoute.snapshot.queryParams;

    selectServiceType(this);
    // Get real name of the service
    this.currentRoute.queryParams.subscribe(res => {
      this.service_type_param = res.service_type
    })

    this.rfq_group_id = this.currentRoute.parent?.snapshot.params.id;

    this.formGroup = new FormGroup({
      Commodity: new FormControl<string>('', [ Validators.required ]),
      Note: new FormControl<string>(''),
      Status: new FormControl<string>(''),

      Shipping_Term: new FormControl<string>(this.default_term),
      Incoterm: new FormControl<string>(this.default_term),
      Need_Insurance: new FormControl<boolean>(false),
      Value_of_Goods: new FormControl<number|null>(null),
      Dangerous_Commodity: new FormControl<boolean>(false),
      Need_Temperature_Control: new FormControl<boolean>(false),
      Temperature: new FormControl<number|null>(null),

      Pickup_Country: new FormControl<string>(''),
      Delivery_Country: new FormControl<string>(''),
      Pickup_Address: new FormControl<string>(''),
      Delivery_Address: new FormControl<string>(''),
      POL_Port_of_Loading: new FormControl<string>(''),
      POD_Port_of_Discharge: new FormControl<string>(''),

      Safety_Data_Sheet: new FormControl<string>(''),
      Total_Packages: new FormControl<number|null>(null),

      child: new FormGroup({
        Quantity: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Length: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Width: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Height: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Net_Weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Gross_Weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
      })
    });

    this.editFields(this.params);

    // Add/Remove multi-line items
    new AddRemoveItems().windowButtons();
  }

  RFQData() {
    this.RFQIDParam = this.params.rfq_ID;
    return this.SearchRFQService.GetRecordByID(this.RFQIDParam); // Get Data depending on its own RFQ ID
  } // # 1

  // # 5
  GetRFQItemRecords() {
    try {
      this.currentRoute.queryParams.subscribe(q => {
        this.rfq_id = q.rfq_ID;
        this.edit_mode = q.edit;
      });
    } catch (e) {
      return; // break the record
    }
  }

  // # 6
  accessItemRecords() {
    this.GetRFQItemRecords();
    let data_tables = document.querySelectorAll(".childs tbody tr td:not(:last-of-type) input");
    let input_list: any = [];


    data_tables.forEach((input: any) => input_list.push(input.attributes.formControlName.nodeValue));
    this.RFQItemRecords.GetRecordByBody({
      "ID":this.rfq_id,
      "Module":"RFQs",
      "Module_feilds":["Service_Type"],
      "Raleted_list": [
          {"api_related":"Items","Raleted_list_fields":input_list}
      ]
    }).subscribe(res => {
      console.log(res.raleted_list[0].Items);
      this.observer.next(res.raleted_list[0].Items);
      this.observer$.subscribe(value => this.item_list = value);
      // this.item_list = res.raleted_list[0].Items;
    });
  }

  // Edit Draft Data # 2
  editFields(params: any) {
    if (params.hasOwnProperty('edit') && params.hasOwnProperty('rfq_ID')) {
      const control_list = Object.keys(this.formGroup.controls);
      let control_input: any;
      let get_input_value = "";
      // Remove Child key
      control_list.pop();

      this.RFQData().subscribe(res => {
        this.last_input_values = res["data"][0];
        this.accessItemRecords();
        this.spinner.endSpinnerLoading();

        control_list.forEach(control_key => {
          control_input = document.querySelector("input[formControlName=" + control_key +"]") as HTMLInputElement;

          get_input_value = this.last_input_values[control_key];
          if (get_input_value !== undefined) {
            control_input.value = get_input_value;
          }
        })
      })
    }
  }

  ngOnInit() {

    // Wait data if the response in the Edit Mode # 3
    if (this.params.hasOwnProperty('edit')) {
      this.spinner.startSpinnerLoading();
    }

    // Calculates totals in realtime
    new TotalQuantity().listenToChangeEvent();
    new TotalDimensionalWeight(6000).listenToChangeEvent();
    new TotalNetWeight().listenToChangeEvent();
    new TotalGrossWeight().listenToChangeEvent();
  }

  createRFQ(RFQForm: AirFreightService)
  {
    let item_list = getItemsOrNone(RFQForm, this);
    RFQForm.Total_Number_of_Packages = numberOfPKGs(item_list);
    RFQForm.Total_Dimensional_Weight = DimensionalWeight(item_list, 6000);
    RFQForm.Total_Net_Weight = netWeight(item_list);
    RFQForm.Total_Gross_weight = grossWeight(item_list);
    RFQForm.Total_Chargeable_Weight = compareWeights(RFQForm.Total_Gross_weight, RFQForm.Total_Dimensional_Weight);

    // Update RFQ by the same RFQ id # 4
    if (this.params.hasOwnProperty('edit')) {
      if (this.params.edit) {
        RFQBody(RFQForm, item_list, this, true, this.RFQIDParam);
        return;
      }
    }
    // Create a new RFQ
    RFQBody(RFQForm, item_list, this);
  }

  // change status before submit data
  submitStatus($event: any) {
    this.setStatus = $event.target.id;
  }

  showHideShippingTerm(shippingTerm: any) {
    return shippingTerm.value.slice(3) !== '-None-';
  }

  changeStateEvent = (checked: any) => checked;

  getIncotermValue($event: any) {
    let value = $event.target.value.slice(3);

    if (value.trim() === "-None-") {
      this.target_value = "-None-";
      return;
    }

    this.showPOL_POD.filter(data => {
      value.trim() === data ? this.target_value = "POL" : "";
    })

    this.showDeliveryAddress.filter(data => {
      value.trim() === data ? this.target_value = "DA" : "";
    })

    this.showPickupAddress.filter(data => {
      value.trim() === data ? this.target_value = "PA" : "";
    })
  }
}
