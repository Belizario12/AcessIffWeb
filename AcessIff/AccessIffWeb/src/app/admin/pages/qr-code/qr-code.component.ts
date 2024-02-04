import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  qrcodeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.qrcodeForm = this.fb.group({
      matricula: ['', Validators.required],
      nome: ['', Validators.required],
      curso: ['', Validators.required],
    })
  }

  save() {

  }

  back() {
    window.history.back();
  }
}
