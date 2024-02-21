import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { QrcodeModalComponent } from '../../components/qrcode-modal/qrcode-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  qrcodeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private controller: UnitOfControllerService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {
    this.qrcodeForm = this.fb.group({
      matricula: ['', Validators.required],
      nome: ['', Validators.required],
      curso: ['', Validators.required],
    })
  }

  save() {
    if(this.qrcodeForm.valid) {
      this.controller.alunoController.GetAlunoByMatricula(this.qrcodeForm.value.matricula).subscribe({
        next: (response) => {
          this.dialog.open(QrcodeModalComponent, {
            width: '1000px',
            height: '600px',
            data: response.metadata.data
          });
          },
        error: (error) => {
          this.toastr.error("Erro ao buscar aluno");

        }
      })
    }
  }

  back() {
    window.history.back();
  }
}
