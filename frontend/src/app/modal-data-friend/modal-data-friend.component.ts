import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

declare const $: any;

@Component({
  selector: "app-modal-data-friend",
  templateUrl: "./modal-data-friend.component.html",
  styleUrls: ["./modal-data-friend.component.css"]
})
export class ModalDataFriendComponent implements OnInit {
  @Input() data: any;

  @ViewChild("modal") modal: ElementRef;

  @Output() dataSave: EventEmitter<string> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: '',
      email: ''
    });
  }

  ngOnInit() {}

  modalToggle() {
    this.form = this.fb.group({
      nome: [this.data.nome, Validators.required],
      email: [this.data.email, Validators.compose([Validators.required, Validators.email]) ]
    });

    return $(this.modal.nativeElement).modal("toggle");
  }

  submitForm(value: any) {
    console.log(value);

    // this.dataSave.emit();

    // this.modalToggle();
  }
}
