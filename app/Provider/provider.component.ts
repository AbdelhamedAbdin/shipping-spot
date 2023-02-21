// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-client',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})

export class ProviderComponent {
  title = "Provider";
}
