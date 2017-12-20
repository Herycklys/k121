import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  _spinner: Boolean = true;

  toggleSpinner(spinner: Boolean) {
    alert(JSON.stringify({ spinner, _spinner: this._spinner }));

    this._spinner = spinner;
  }

  makeSort() {
    
  }
}
