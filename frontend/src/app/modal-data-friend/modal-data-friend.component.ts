import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-modal-data-friend',
  templateUrl: './modal-data-friend.component.html',
  styleUrls: ['./modal-data-friend.component.css']
})
export class ModalDataFriendComponent implements OnInit {
  @Input() data: any;

  @Output() dataSave:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  modalToggle() {
    return $('#create-or-update').modal('toggle');
  }

  saveData() {
    this.dataSave.emit();
  }

}
