import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSpin: Boolean = false;

  toggleSpinner(showSpin) {
    this.showSpin = showSpin;
  }

  makeSort() {
    
  }
}
