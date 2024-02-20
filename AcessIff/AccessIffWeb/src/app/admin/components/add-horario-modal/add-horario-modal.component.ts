import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';

@Component({
  selector: 'app-add-horario-modal',
  templateUrl: './add-horario-modal.component.html',
  styleUrls: ['./add-horario-modal.component.scss'],
})
export class AddHorarioModalComponent {
  horarioForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddHorarioModalComponent>,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
  ) {
    this.horarioForm = this.fb.group({
      disciplina: ['', Validators.required],
      dia: ['', Validators.required],
      horaInicio: ['', Validators.required, timeFormatValidator()],
      horaFim: ['', Validators.required, timeFormatValidator()],
    });
  }

  saveHorario() {
    const horarioObj = {
      disciplina: this.horarioForm.get('disciplina')?.value,
      dia: this.horarioForm.get('dia')?.value,
      horarioInicio: this.horarioForm.get('horaInicio')?.value,
      horarioFim: this.horarioForm.get('horaFim')?.value,
      turmaId: this.data.turmaId,
    };

    this.controller.horarioController.postHorarios(horarioObj).subscribe({
      next: () => {
        this.toastr.success('Horário adicionado com sucesso');
        this.dialogRef.close();
      },
      error: (err) => {
        this.toastr.error('Erro ao adicionar horário');
        console.error(err);
      },
    })
  }

  fechar() {
    this.dialogRef.close();
  }
}

export function timeFormatValidator(): ValidatorFn {
  return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
    return new Promise((resolve, reject) => {
      const value = control.value;
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // Formato HH:MM

      if (!regex.test(value)) {
        resolve({ 'invalidTimeFormat': { value: value } });
      } else {
        resolve(null);
      }
    });
  };
}
