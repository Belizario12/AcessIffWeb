import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { Eventos, Tipo } from 'src/app/interfaces/evento';

@Component({
  selector: 'app-calendario-modal',
  templateUrl: './calendario-modal.component.html',
  styleUrls: ['./calendario-modal.component.scss'],
})
export class CalendarioModalComponent {
  eventoForm: FormGroup;
  eventosCadastrados: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<CalendarioModalComponent>
  ) {
    if (this.data.element !== '') {
      this.eventoForm = this.fb.group({
        nome: ['' || this.data.element.title, Validators.required],
        dataInicio: [
          '' || this.data.element.start.toISOString().substring(0, 10),
          Validators.required,
        ],
        dataFim: [
          '' || this.data.element.end.toISOString().substring(0, 10),
          Validators.required,
        ],
        tipo: ['' || this.data.element.color, Validators.required],
      });
    } else {
      this.eventoForm = this.fb.group({
        nome: ['', Validators.required],
        dataInicio: ['', Validators.required],
        dataFim: ['', Validators.required],
        tipo: ['', Validators.required],
      });
    }

    this.controller.eventosController.getEventos().subscribe({
      next: (response) => {
        this.eventosCadastrados = response.metadata.data;
        console.log(this.eventosCadastrados);
      },
    });
  }

  save(element?: string) {
    const eventos: Eventos = {
      nome: this.eventoForm.get('nome')?.value,
      dataInicio: new Date(this.eventoForm.get('dataInicio')?.value).toString(),
      dataFim: new Date(this.eventoForm.get('dataFim')?.value).toString(),
      tipo: this.eventoForm.get('tipo')?.value,
    };

    const eventoSelecionado = this.eventosCadastrados.find((element: any) => {
      if (
        element.nome === this.data.element.title &&
        element.dataInicio ===
          this.data.element.start.toString() &&
        element.dataFim ===
          this.data.element.end.toString()
      ) {
        return element;
      }
    });
    if (this.eventoForm.valid) {
      if (this.data.type == 'Create') {
        this.controller.eventosController.postEvento(eventos).subscribe({
          next: () => {
            this.toastr.success('Evento criado com sucesso');
            window.location.reload();
            this.dialogRef.close();
          },
          error: () => {
            this.toastr.error('Erro ao criar evento');
          },
        });
      } else if (this.data.type == 'Edit') {
        this.controller.eventosController
          .putEvento(eventoSelecionado.id, eventos)
          .subscribe({
            next: () => {
              this.toastr.success('Evento atualizado com sucesso');
              window.location.reload();
              this.dialogRef.close();
            },
            error: () => {
              this.toastr.error('Erro ao atualizar evento');
            },
          });
      } else if(element === "Delete") {
        this.controller.eventosController
          .deleteEvento(eventoSelecionado.id)
          .subscribe({
            next: () => {
              this.toastr.success('Evento deletado com sucesso');
              window.location.reload();
              this.dialogRef.close();
            },
            error: () => {
              this.toastr.error('Erro ao deletar evento');
            },
          });
      }
    }
  }

  delete() {
    this.data.type = "Delete"
  }

  fechar() {
    this.dialogRef.close();
  }
}
