// Built-in Angular Apps
import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-flash-message',
  templateUrl: './Flash.component.html',
  styleUrls: ['./Flash.component.css']
})

export class FlashComponent {
  title: string = "Flash";
  name: string = "";
  notified: boolean = false;

  constructor() {}

  // Listen to flash consumer
  // flashListener = new BehaviorSubject("");
  // $flashListener = this.flashListener.asObservable();
  //
  // FlashMessage(message: string, name: string) {
  //   this.flashListener.next(name);
  //   this.$flashListener.subscribe(get_value => {
  //     this.name = get_value;
  //   })
  //   // @ts-ignore
  //   const _objs = Object.create(this.name, message);
  //   return _objs;
  // }
}
