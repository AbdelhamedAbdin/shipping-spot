// ShippingSpot Services
import { ContactsService } from "../DataAccess/CRMModules/Contacts.service";
// Built-in Angular Apps
import {Component, Injectable} from '@angular/core';


@Component({
  selector: 'app-testing',
  templateUrl: './dataTest.component.html'
})

@Injectable()
export class TestComponent {
  title: string = "Data Access Test";

  constructor(private contactService: ContactsService) {
    this.contactService.Method = "GET";
    console.log(this.contactService.Method);
    this.contactService.GetRecords();
  }
}
