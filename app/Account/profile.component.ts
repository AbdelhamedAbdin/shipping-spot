// Built-in Angular Apps
import { Component, Injectable, Input } from '@angular/core';
// API Services
import { ContactsService } from "../../services/CRMModules/Contacts";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  title = "Profile";
  @Input() user_request: any;

  constructor(private contactsService: ContactsService) {
    const contact_service = this.contactsService.GetRecordByID("5031882000000561130");
    contact_service.subscribe(res => {
      console.log(res["data"]);
    })
  }
}
