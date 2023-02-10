// Built-in Angular Apps
import { Component, Injectable, Input, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent {
  title = "Client";

}
