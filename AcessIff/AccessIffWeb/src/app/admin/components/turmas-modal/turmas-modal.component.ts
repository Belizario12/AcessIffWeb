import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';

@Component({
  selector: 'app-turmas-modal',
  templateUrl: './turmas-modal.component.html',
  styleUrls: ['./turmas-modal.component.scss']
})
export class TurmasModalComponent {
  turmaForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<TurmasModalComponent>
  ) {
    this.turmaForm = this.fb.group({
      nome: ['' || this.data.element.nome, Validators.required],
    })
  }

  save() {
    console.log(this.data)
    if(this.turmaForm.valid) {
      if(this.data.type == "Create") {
        this.controller.turmaController.createTurma(this.turmaForm.value).subscribe({
          next: () => {
            this.toastr.success('Turma criada com sucesso');
            window.location.reload();
            this.dialogRef.close();
          },
          error: () => {
            this.toastr.error('Erro ao criar turma');
          }
        })
      } else if(this.data.type == "Edit") {
        this.controller.turmaController.updateTurma(this.data.element.id, this.turmaForm.value).subscribe({
          next: () => {
            this.toastr.success('Turma atualizada com sucesso');
            window.location.reload();
            this.dialogRef.close();
          },
          error: () => {
            this.toastr.error('Erro ao atualizar turma');
          }
        })
      } else {
        this.controller.turmaController.deleteTurma(this.data.element.id).subscribe({
          next: () => {
            this.toastr.success('Turma deletada com sucesso');
            window.location.reload();
            this.dialogRef.close();
          },
          error: () => {
            this.toastr.error('Erro ao deletar turma');
          }

        })
      }
    }
  }

  fechar() {
    window.history.back();
  }
}
