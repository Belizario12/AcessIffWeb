import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { CreateHorario } from 'src/app/interfaces/horario';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent {
  horarioForm!: FormGroup;
  options: any[] = [];
  selectedOption: any;
  horarioId: string = '';
  create: boolean = true;

  constructor(
    private fb: FormBuilder,
    private controller: UnitOfControllerService,
    private toastr: ToastrService,
    private router: ActivatedRoute
  ) {
    this.horarioForm = this.fb.group({
      disciplina: ['', Validators.required],
      turma: ['', Validators.required],
      diaSemana: ['', Validators.required],
      inicio: ['', Validators.required, timeFormatValidator()],
      termino: ['', Validators.required, timeFormatValidator()],
    });
    console.log(this.router.params)
    this.controller.turmaController.getTurmas(1, 10).subscribe({
      next: (response) => {
        this.options = response.metadata.data;
        this.router.params.subscribe({
          next: (params) => {
            if(params['disciplina'] !== undefined) {
              this.create = false;
            }
            this.horarioForm.patchValue({
              disciplina: params['disciplina'],
              turma: this.options.find((option) => option.id === params['turmaId']).nome,
              diaSemana: params['dia'],
              inicio: params['horarioInicio'],
              termino: params['horarioFim']
            });
            this.horarioId = params['id'];
          }
        })
      }
    });

  }

  save() {
    const turmaId = this.options.find((option) => option.nome === this.horarioForm.get('turma')?.value);
    const horarioObj: CreateHorario = {
      disciplina: this.horarioForm.get('disciplina')?.value,
      turmaId: turmaId.id,
      dia: this.horarioForm.get('diaSemana')?.value,
      horarioInicio: this.horarioForm.get('inicio')?.value,
      horarioFim: this.horarioForm.get('termino')?.value,
    }
    if(this.create) {
      this.controller.horarioController.postHorarios(horarioObj).subscribe({
        next: (response) => {
          this.toastr.success('Horário cadastrado com sucesso');
          window.history.back();
        },
        error: (error) => {
          this.toastr.error(error.message);
        }
      })
    } else {
      this.controller.horarioController.putHorarios(horarioObj, this.horarioId).subscribe({
        next: (response) => {
          this.toastr.success('Horário atualizado com sucesso');
          window.history.back();
        },
        error: (error) => {
          this.toastr.error(error.message);
        }
      })

    }

  }

  back() {
    window.history.back();
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
