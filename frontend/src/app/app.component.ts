import { Component } from '@angular/core';

let that: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  _spinner: Boolean = false;

  constructor() {
    that = this;
  }

  toggleSpinner(spinner: Boolean) {
    that._spinner = spinner;
  }

  makeSort() {
    
  }
}
