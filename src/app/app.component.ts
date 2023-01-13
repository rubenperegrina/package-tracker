import { Component } from '@angular/core';
import { faCalendarDays, faDolly, faHandHoldingHeart, faLocationDot, faTruckFast, faWarehouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'package-tracker';
  faHandHoldingHeart = faHandHoldingHeart;
  faTruckFast = faTruckFast;
  faCalendarDays = faCalendarDays;
  faLocationDot = faLocationDot;
  faWarehouse = faWarehouse;
  faDollyBox = faDolly;

  constructor() { }

  toogleDarkMode() {
    document.documentElement.classList.toggle('dark')

  }
}
