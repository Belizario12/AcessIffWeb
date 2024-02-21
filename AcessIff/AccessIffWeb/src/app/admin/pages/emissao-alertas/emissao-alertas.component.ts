import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { CreateAlerta } from 'src/app/interfaces/alerta';

@Component({
  selector: 'app-emissao-alertas',
  templateUrl: './emissao-alertas.component.html',
  styleUrls: ['./emissao-alertas.component.scss']
})
export class EmissaoAlertasComponent {
  alertaForm!: FormGroup;
  alertaObj: CreateAlerta = {
    titulo: '',
    descricao: '',
  }

  constructor(
    private fb: FormBuilder,
    private controller: UnitOfControllerService,
    private toast: ToastrService,
  ) {
    this.alertaForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  save() {
    if (this.alertaForm.valid) {
      this.alertaObj.titulo = this.alertaForm.controls['title'].value;
      this.alertaObj.descricao = this.alertaForm.controls['message'].value;

      this.controller.alertaController.postAlerta(this.alertaObj).subscribe({
        next: (result) => {
          (result);
          this.toast.success('Alerta emitido com sucesso!', 'Sucesso');
          window.history.back();
        },
        error: (error) => {

          this.toast.error('Erro ao emitir alerta!', 'Erro');
        }
      })
    }
  }

  back() {
    window.history.back();
  }
}
