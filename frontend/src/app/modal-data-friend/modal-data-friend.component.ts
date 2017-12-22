import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from "@angular/core";

import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from "@angular/forms";

declare const $: any;

@Component({
  selector: "app-modal-data-friend",
  templateUrl: "./modal-data-friend.component.html",
  styleUrls: ["./modal-data-friend.component.css"]
})
export class ModalDataFriendComponent implements OnInit {
  data: any = {
    title: 'MODAL_DEFAULT'
  };

  @ViewChild("modal") modal: ElementRef;

  @Output() dataSave: EventEmitter<{ nome: String, email: String }> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: '',
      email: ''
    });
  }

  private customValidateRequired(control: FormControl): ValidationErrors {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;

    return isValid ? null : { 'whitespace': true };
  }

  ngOnInit() {}

  private modalToggle() {
    return $(this.modal.nativeElement).modal("toggle");
  }

  show(elementsModal: { title: String, nome: String, email: String }) {
    this.data.title = elementsModal.title;

    this.form = this.fb.group({
      nome: [elementsModal.nome, this.customValidateRequired],
      email: [elementsModal.email, Validators.compose([Validators.required, Validators.email])]
    });

    this.modalToggle();
  }

  submitForm(value: any) {
    this.dataSave.emit({
      nome: value.nome,
      email: value.email
    });

    this.modalToggle();
  }
}
